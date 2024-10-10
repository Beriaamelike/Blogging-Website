import Categories from "../../components/categories/Categories"
import Header from "../../components/header/Header"
import Posts from "../../components/posts/Posts"
import Sidebar from "../../components/sidebar/Sidebar"

import Topbar from "../../components/topbar/Topbar"
import "./homepage.css"

function Homepage() {
    return (
        <>
            <Header />
            <div className="home">
                <span className="categoriesTitle">CATEGORIES</span>
                <Categories />
                <span className="categoriesTitle">ALL POSTS</span>
                <Posts />
                <Sidebar />
            </div>
        </>


    )
}

export default Homepage
