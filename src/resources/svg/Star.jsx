const StarIcon = (props) => {
  return (
    <svg
      class="yotpo-star-rating-icon yotpo-sr-star-full"
      width="18"
      height="18"
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="scale(1.2, 1.2)"
      {...props}
    >
      <defs>
        <linearGradient id="yotpo_stars_gradient_0.8725824490436556">
          <stop offset="100%" stopColor="#E7721B"></stop>
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="1"></stop>
        </linearGradient>
      </defs>
      <path
        d="M17.0919 25.4549L16.8335 25.299L16.5751 25.4549L7.39263 30.9971L9.82942 20.5516L9.89798 20.2577L9.66988 20.0601L1.55658 13.0315L12.2393 12.1252L12.5397 12.0997L12.6574 11.8221L16.8335 1.9688L21.0096 11.8221L21.1273 12.0997L21.4277 12.1252L32.1104 13.0315L23.9971 20.0601L23.769 20.2577L23.8376 20.5516L26.2744 30.9971L17.0919 25.4549Z"
        stroke="#E7721B"
        fill="url(#yotpo_stars_gradient_0.8725824490436556)"
      ></path>
    </svg>
  );
};
export default StarIcon;
