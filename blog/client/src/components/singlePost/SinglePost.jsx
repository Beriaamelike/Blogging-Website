import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./singlePost.css";
import Comments from "../comments/Comments";


export default function SinglePost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/posts/${id}`);
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };
        fetchPost();
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="singlePost">
                <div className="singlePostWrapper">
                    <img className="singlePostImg" src={post.imageURL} alt={post.title} />
                    <div className="singlePostContent">
                        <h1 className="singlePostTitle">
                            {post.title}
                            <div className="singlePostEdit">
                                <i className="singlePostIcon far fa-edit"></i>
                                <i className="singlePostIcon far fa-trash-alt"></i>
                            </div>
                        </h1>
                        <div className="singlePostInfo">
                            <span>
                                Author: <b className="singlePostAuthor">{post.author}</b>
                            </span>
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                        <p className="singlePostDesc">{post.content}</p>
                    </div>
                </div>
                <div className="commentsContainer">
                    <Comments postId={id} />
                </div>
            </div>

        </>
    );
}
