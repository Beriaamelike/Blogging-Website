import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function SinglePost() {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/posts/${id}`);
                setPost(response.data);
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
        <div>
            <h1>{post.title}</h1>
            <p>Author: {post.user.username}</p>
            <p>Date: {new Date(post.createdAt).toLocaleDateString()}</p>
            <p>{post.content}</p>
        </div>
    );
}
