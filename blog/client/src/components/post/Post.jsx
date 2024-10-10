import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./post.css";

export default function Post() {
  const { id } = useParams(); // URL'den post id'yi al
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/posts/${id}`); // Dinamik id ile istek yapıyoruz
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
    <div className="post-detail-container">

      <img src={post.imageURL} alt={post.title} />
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <div className="info">
        <p>{new Date(post.createdAt).toLocaleDateString()}</p>
        <p>{post.commentsCount} comments</p>
        <p>{post.likesCount} likes</p>
      </div>
    </div>
  );
}
