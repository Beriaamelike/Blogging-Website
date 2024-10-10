import { Link } from "react-router-dom";
import "./category.css";

export default function Category({ img, name }) {
    return (


        <div className="category">

            <img
                className="categoryImg"
                src={img}
                alt=""
            />
            <div className="categoryInfo">
                <span className="categoryTitle">
                    {name}
                </span>
            </div>
        </div>

    );
}
