import StarIcon from "resources/svg/Star";
import StarOutlineIcon from "resources/svg/StarOutline";

const Rate = ({ value = 0, count = 5 }) => {
  return (
    <div className="romand-rate">
      {Array.from({ length: count }, (_, i) =>
        i < Math.round(value) ? 1 : 0
      ).map((item) => (item == 1 ? <StarIcon /> : <StarOutlineIcon />))}
    </div>
  );
};
export default Rate;
