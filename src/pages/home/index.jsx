import axios from "axios";
import Banner from "components/pages/home/Banner/Banner";
import BestSellers from "components/pages/home/BestSellers/BestSellers";
import { useEffect } from "react";
import bannerVideo from "resources/video/banner.mp4";

export const getBook = async () => {
  const res = await axios.get("http://localhost:8080/api/books");
  return res.data;
};
function HomePage() {
  useEffect(() => {}, []);
  return (
    <div className="home-page">
      <Banner />
      <div className="home-page_inner">
        <BestSellers />
        <div className="home-page-banner-video">
          <div class="feature-text-paired align-center media-with-text__text">
            <div class="subheading subheading--over">NEW COLOR DROP✨</div>
            <h2 class="majortitle h1-style">
              GLASTING WATER TINT
              <br />
              #SUNSET🫦
            </h2>
            <div class="rte">
              <p>SUNSET WATER GLOSS ON YOUR LIPS</p>
            </div>
            <div class="lightish-spaced-row-above">
              <a
                class="btn btn--secondary btn--link"
                href="/products/glasting-color-gloss"
              >
                <span class="btn__text">SHOP NOW</span>
              </a>
            </div>
          </div>

          <video src={bannerVideo} loop controls={false} autoPlay></video>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
