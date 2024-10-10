import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './comments.css';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState(""); // Yeni yorum için state

    // Yorumları çekmek için useEffect kullanıyoruz
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/comments/post/${postId}`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };
        fetchComments();
    }, [postId]);

    // Yorum ekleme işlemi için handleSubmit fonksiyonu
    const handleSubmit = async (e) => {
        e.preventDefault(); // Sayfanın yenilenmesini engeller
        const token = localStorage.getItem("token"); // JWT token'ı alıyoruz

        try {
            // Yorum API'ye gönderiliyor
            const response = await axios.post(
                `http://localhost:8080/api/comments/save/${postId}`,
                { commentInfo: commentText },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // Yeni yorumu mevcut yorumlara ekliyoruz
            setComments([...comments, response.data]);
            setCommentText(""); // Yorum alanını temizliyoruz
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <div className="row d-flex justify-content-end" id="row">
            <div className="col-md-1 col-lg-8">
                <div className="card shadow-0 border" style={{ backgroundColor: "#f0f2f5" }}>
                    <div className="card-body p-4">
                        {/* Yorum Ekleme Alanı */}
                        <form onSubmit={handleSubmit}>
                            <div data-mdb-input-init="" className="form-outline mb-4">
                                <input
                                    type="text"
                                    id="addANote"
                                    className="form-control"
                                    placeholder="Type comment..."
                                    value={commentText} // Yorum state'i ile bağlıyoruz
                                    onChange={(e) => setCommentText(e.target.value)} // Input değişimini yönetiyoruz
                                />
                                <label className="form-label" htmlFor="addANote">+ Add a note</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>

                        {/* Yorumları Listeleme Alanı */}
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <div className="card mb-4" key={comment.commentId}>
                                    <div className="card-body">
                                        <p>{comment.commentInfo}</p>
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex flex-row align-items-center">
                                                <p className="small mb-0">{comment.user.name}</p>
                                            </div>
                                            <div className="d-flex flex-row align-items-center">
                                                <p className="small text-muted mb-0">{new Date(comment.createdCommentAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No comments yet for this post</p>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Comments;
