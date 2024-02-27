import { useEffect, useState } from "react";
import { useAuth } from "../contexts/auth";
import { useNavigate } from "react-router-dom";
import CurrencySelector from "../components/CurrencySelector";
import {Helmet} from "react-helmet";

export default function Auth() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [fromAmout, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(null);
  const shouldCalculateButtonActivate = from && to && fromAmout > 0;

  useEffect(() => {
    if (loading == false && !user) {
      navigate("/");
    }
  }, [loading, user]);

  const handleLogout = () => {
    logout();
  };

  const handleSelectFrom = (event) => {
    const { value } = event.target;
    setFrom(value);
    setToAmount(null);
  };

  const handleSelectTo = (event) => {
    const { value } = event.target;
    setTo(value);
    setToAmount(null);
  };

  const handleTextInput = (event) => {
    const { value } = event.target;
    setFromAmount(value);
    setToAmount(null);
  };

  const handleCalculateButton = async () => {
    try {
      const url = `http://localhost:1337/currency-conversion?from=${from}&to=${to}&amount=${fromAmout}`;
      const response = await fetch(url);
      const result = await response.json();
      const { error, data } = result;
      if (error) {
        return alert("Please check form and re-submit");
      } else {
        const { converted_amount } = data;
        setToAmount(converted_amount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(shouldCalculateButtonActivate);

  if (loading) return <span>Loading...</span>;

  return (
    <div className="container">
      <h1>Currency Conversion tool using strapi</h1>
      <div className="currency-container">
        <div className="currency-item-box">
          <h2>From</h2>
          <CurrencySelector handleSelect={handleSelectFrom} currency={from} />
          <div style={{ marginTop: 20 }}>
            <label htmlFor="input-currency" style={{ padding: 10 }}>
              Input Currency
            </label>
            <input
              onChange={handleTextInput}
              type="number"
              id="input-currency"
              value={fromAmout}
            />
          </div>
        </div>

        <div className="currency-item-box">
          <h2>To</h2>
          <CurrencySelector handleSelect={handleSelectTo} currency={to} />
          <div style={{ marginTop: 20 }}>
            {toAmount && (
              <span style={{ fontSize: 19 }}>
                {toAmount} {to}
              </span>
            )}
          </div>
        </div>
      </div>

      <div
        style={{ marginBottom: 100, display: "flex", justifyContent: "center" }}
      >
        <button
          onClick={handleCalculateButton}
          className={`calculate-btn ${shouldCalculateButtonActivate ? 'active' : 'inactive'}`}
        >
          Calculate
        </button>
      </div>

      <button
          className="SS_ProductCheckout"
          type="button"
          data-id="1"
          data-email="test@mail.com"
          data-url="http://localhost:5173/home"
        >
          Buy Now
        </button>

      <button onClick={handleLogout}>Logout</button>

      <Helmet>
        <script
          defer
          type="text/javascript"
          src="http://localhost:1337/plugins/strapi-stripe/static/stripe.js"
        ></script>
      </Helmet>
    </div>
  );
}
