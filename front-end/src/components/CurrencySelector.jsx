import currencies from "../constants/commonCurrency.json";
import PropTypes from "prop-types";

export default function CurrencySelector({
  handleSelect = () => {},
  currency = "USD",
}) {
  return (
    <div className="custom-select">
      <select onChange={handleSelect} value={currency}>
        {Object.keys(currencies).map((currency, index) => (
          <option value={currency} key={index}>
            {currency} - {currencies[currency].name}
          </option>
        ))}
      </select>
    </div>
  );
}

CurrencySelector.propTypes = {
  handleSelect: PropTypes.func,
  currency: PropTypes.string,
};
