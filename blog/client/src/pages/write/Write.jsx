import React, { useState } from "react";
import axios from "axios";
import "./write.css";

function WritePost() {
    const [title, setTitle] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !category || !content.trim() || !imageURL.trim()) {
            alert("Lütfen tüm alanları doldurun!");
            return;
        }

        const postData = { title, imageURL, category, content };

        axios.post("http://localhost:8080/api/posts/save", postData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        })
            .then(() => {
                alert("Başarıyla postalandı!");
                setTitle("");
                setImageURL("");
                setCategory("");
                setContent("");
            })
            .catch(() => alert("Bir hata oluştu. Tekrar deneyin."));
    };

    return (
        <div className="write-post-container">
            <form onSubmit={handleSubmit} className="write-post-form">
                <input
                    placeholder="Title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="write-post-input"
                    autoFocus
                />
                <input
                    placeholder="Image URL"
                    type="text"
                    value={imageURL}
                    onChange={(e) => setImageURL(e.target.value)}
                    className="write-post-input"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="write-post-select"
                >
                    {["Technology", "Lifestyle", "Education", "Art", "Fashion", "Career", "Travel", "Health"].map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
                <textarea
                    placeholder="Write your text..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="write-post-textarea"
                />
                <button type="submit" className="write-post-button">Post</button>
            </form>
        </div>
    );
}

export default WritePost;


