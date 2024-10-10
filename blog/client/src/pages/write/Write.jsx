import React, { useState } from "react";
import axios from "axios";
import "./write.css";

function WritePost() {
    const [title, setTitle] = useState("");
    const [imageURL, setImageURL] = useState(null); // Resmi tutmak için
    const [category, setCategory] = useState("");
    const [content, setContent] = useState("");
    const [message, setMessage] = useState("");
    const [imagePreview, setImagePreview] = useState(null); // Önizleme için

    // Başlık değiştirme
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    // Resim yükleme işlemi
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageURL(file); // Dosya objesini kaydet
            setImagePreview(URL.createObjectURL(file)); // Önizleme için URL oluştur
        }
    };

    // Kategori değiştirme
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    // İçerik değiştirme
    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    // Form gönderme işlemi
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title.trim() || !category || !content.trim() || !imageURL) {
            setMessage("Lütfen tüm alanları doldurun!");
            return;
        }

        // Form verilerini topluyoruz
        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("content", content);
        formData.append("imageURL", imageURL); // Resim dosyasını ekle

        const token = localStorage.getItem("token");

        axios
            .post("http://localhost:8080/api/posts/save", formData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                setMessage("Başarıyla postalandı!");
                setTitle("");
                setCategory("");
                setContent("");
                setImageURL(null);
                setImagePreview(null);
            })
            .catch((error) => {
                setMessage("Bir hata oluştu. Tekrar deneyin.");
                console.error("Error:", error);
            });
    };

    return (
        <div className="write">
            {imagePreview && (
                <img
                    className="writeImg"
                    src={imagePreview}
                    alt="Preview"
                    style={{ objectFit: "contain", maxHeight: "300px", maxWidth: "100%" }}
                />
            )}
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <input
                        className="writeInput"
                        placeholder="Title"
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        autoFocus={true}
                    />
                </div>

                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fas fa-plus"></i> Add image
                    </label>
                    <input
                        id="fileInput"
                        type="file"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                    />
                </div>

                <div className="writeFormGroup">
                    <select
                        className="writeSelect"
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        <option value="Technology">Technology</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Education">Education</option>
                        <option value="Art">Art</option>
                        <option value="Fashion">Fashion</option>
                        <option value="Career">Career</option>
                        <option value="Travel">Travel</option>
                        <option value="Health">Health</option>
                    </select>
                </div>

                <div className="writeFormGroup">
                    <textarea
                        className="writeInput writeText"
                        placeholder="Write your text..."
                        value={content}
                        onChange={handleContentChange}
                    />
                </div>

                <button className="writeSubmit" type="submit">
                    Post
                </button>
            </form>
            {message && <p className="statusMessage">{message}</p>}
        </div>
    );
}

export default WritePost;
