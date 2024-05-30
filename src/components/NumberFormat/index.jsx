import { NumericFormat } from "react-number-format";

const NumberFormat = ({ value, decimalScale = 2 }) => {
  return (
    <NumericFormat
      thousandSeparator
      displayType="text"
      decimalScale={decimalScale}
      value={value}
    />
  );
};

export default NumberFormat;
