import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './comments.css';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                `http://localhost:8080/api/comments/save/${postId}`,
                { commentInfo: commentText },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setComments([...comments, response.data]);
            setCommentText("");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    return (
        <div className="comments-container">
            <div className="comments-card">
                <div className="comments-body">
                    <form onSubmit={handleSubmit} className="comment-form">
                        <input
                            type="text"
                            className="comment-input"
                            placeholder="Type comment..."
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <button type="submit" className="submit-button">Submit</button>
                    </form>

                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div className="comment-card" key={comment.commentId}>
                                <div className="comment-content">
                                    <p>{comment.commentInfo}</p>
                                    <div className="comment-footer">
                                        <p className="comment-username">{comment.user.username}</p>
                                        <p className="comment-date">{new Date(comment.createdCommentAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-comments">No comments yet for this post</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Comments;

