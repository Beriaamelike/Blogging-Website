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
      <div className="row mt-n5">
        {posts.map((posts) => (
          <div
            key={posts.id}
            className="col-md-6 col-lg-4 mt-5 wow fadeInUp"
            data-wow-delay=".2s"
            style={{
              visibility: "visible",
              animationDelay: "0.2s",
              animationName: "fadeInUp",
            }}
          >
            <div className="blog-grid">
              <div className="blog-grid-img position-relative">
                <img
                  alt={posts.title}
                  src={`http://localhost:8080${posts.imageURL}`} // Veritabanından gelen imageURL'yi doğru şekilde birleştir
                />
              </div>
              <div className="blog-grid-text p-4">
                <h3 className="h5 mb-3">
                  <Link to={`/post/${posts.id}`}>{posts.title}</Link> {/* Post başlığı */}
                </h3>
                <p className="display-30">{posts.content.substring(0, 100)}...</p> {/* Post içeriği (kısa gösterim) */}
                <div className="meta meta-style2">
                  <ul>
                    <li>
                      <a href="#!">
                        <i className="fas fa-calendar-alt" /> {new Date(posts.createdAt).toDateString()} {/* Post tarihi */}
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        <i className="fas fa-folder" /> {posts.category} {/* Post kategorisi */}
                      </a>
                    </li>
                    <li>
                      <a href="#!">
                        <i className="fas fa-user" /> {posts.user.name} {/* Post yazarı */}
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>



    // <div className="posts-container">
    //   {posts.map((posts) => (
    //     <div key={posts.id} className="card">

    //       <div className="img">
    //         <img className="img" src={posts.imageURL} alt={posts.title} />
    //       </div>
    //       <div className="info">
    //         <a>{posts.category} </a>
    //       </div>
    //       <div className="bottom">
    //         <h2 className="title">
    //           <a href="#">{posts.title}</a>
    //         </h2>
    //         <div className="author">

    //           <p className="name">
    //             By &nbsp;
    //             <a>{posts.author}</a>
    //           </p>
    //         </div>
    //         <p className="intro">
    //           {posts.content.substring(0, 200)}... {/* İçeriğin ilk 200 karakteri */}
    //         </p>
    //         <Link to={`/post/${posts.id}`} className="read-more">
    //           Read More..
    //         </Link>
    //         <div className="info">
    //           <ion-icon name="time"></ion-icon>
    //           <p className="info">
    //             {new Date(posts.createdAt).toLocaleDateString()}
    //           </p>
    //           <ion-icon name="chatboxes"></ion-icon>
    //           <p className="info">
    //             <a>{posts.commentsCount} comments</a>
    //             <a>{posts.likesCount} likes</a>
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>
  );
}


