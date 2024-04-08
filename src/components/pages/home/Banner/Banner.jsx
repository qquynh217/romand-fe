import banner from "resources/images/banner-pc.webp";

function Banner() {
  return (
    <div className="home-banner">
      <img src={banner} alt="banner" className="banner-image" />
    </div>
  );
}

export default Banner;
