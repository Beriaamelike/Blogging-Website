import Category from "../category/Category";
import "./categories.css";

export default function Categories() {
    return (
        <div className="categories">
            <Category img="https://img.tamindir.com/resize/1200x675/2023/12/470608/teknolojinin-olumlu-yonleri.jpg" name="Technology" />
            <Category img="https://img.freepik.com/premium-photo/peaceful-yoga-scene-serene-natural-setting-capturing-essence-tranquility-balance-person-meditative-pose-surrounded-by-lush-greenery-ai-generative_143683-21341.jpg" name="Health" />
            <Category img="https://worldwildschooling.com/wp-content/uploads/2024/01/Paris-things-to-do_-Eiffel-tower_zigres_AdobeStock_510424680-1024x576.jpg" name="Travel" />
            <Category img="https://cdn.prod.website-files.com/62a85c75feb9bdf4905f9f24/65fdbd5f3a0ed0a4c6b485f7_pexels-olia-danilevich-8145335.jpg" name="Career" />
            <Category img="https://media.licdn.com/dms/image/D4E12AQGeas1AQpWRfQ/article-cover_image-shrink_720_1280/0/1657641141789?e=2147483647&v=beta&t=kMuPVeMp4gZYsZkeHpeq6_Kv0aMMqsq8a2lNl8FiL8M" name="Education" />
            <Category img="https://styleandsenses.com/wp-content/uploads/2020/02/20200202-Style-Senses-An-Trieu-Uniqlo-Paloma-Wool-Massimo-Dutti-Telfar-Glasswing-Muji-9-1080x675.jpg" name="Fashion" />
            <Category img="https://images.squarespace-cdn.com/content/v1/5fe1c9a0013d1b71f8bbe7b0/8a97d707-ff74-4608-aadc-ba301a3dee39/pexels-antoni-shkraba-4442035.jpg" name="Art" />
            <Category img="https://media.istockphoto.com/id/1326419180/photo/beautiful-woman-relaxing-and-drinking-hot-tea.jpg?s=612x612&w=0&k=20&c=qrSWG73ojw7pUftLvkQxL6maCWhfQVjuAba96d0vbEU=" name="Lifestyle" />
        </div>
    );
}