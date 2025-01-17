import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <footer className="bg-body-tertiary text-center">
      {/* Social media buttons container */}
      <div className="container p-6 pb-0">
        <section className="mb-6">
          {/* Social media links */}
          {['facebook', 'twitter', 'google', 'instagram', 'linkedin', 'github'].map((social, index) => (
            <a
              key={index}
              data-mdb-ripple-init=""
              className="btn text-white btn-floating m-1"
              style={{ backgroundColor: getColor(social) }}
              href="#!"
              role="button"
            >
              <i className={`fab fa-${social}`} />
            </a>
          ))}
        </section>
      </div>

      {/* Footer Copyright */}
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2020 Copyright:
        <a className="text-body" href="https://mdbootstrap.com/">
          MDBootstrap.com
        </a>
      </div>
    </footer>
  );
}

// Helper function to return background color for each social media platform
function getColor(platform) {
  const colors = {
    facebook: "#3b5998",
    twitter: "#55acee",
    google: "#dd4b39",
    instagram: "#ac2bac",
    linkedin: "#0082ca",
    github: "#333333",
  };
  return colors[platform] || "#000"; // Default fallback
}
