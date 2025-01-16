import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./posts.css";

export default function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/posts/getall");
        const data = await response.json();
        console.log(data);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className="container">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <img alt={post.title} src={post.imageURL} />
          <h3>
            {post.title}
          </h3>
          <p>{post.content.substring(0, 135)}... <Link className="link" to={`/post/${post.id}`}>Read more</Link></p>
          <div className="meta">
            <span>{new Date(post.createdAt).toDateString()}</span> |
            <span>{post.category}</span> |
            <span>{post.user.username}</span>
          </div>
        </div>
      ))}
    </div>
  );
}


