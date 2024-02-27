/*
 *
 * HomePage
 *
 */

import React, { useEffect, useState } from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import { Layout, BaseHeaderLayout, ContentLayout } from "@strapi/design-system";
import CurrencyView from "../../components/home/CurrencyView";
import styled from "styled-components";
import { Helmet } from "react-helmet";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  background-color: green;
  color: white;
  border: 1px solid white;
  margin-top: 30px;
  padding: 10px 20%;
  border-radius: 5px;
`;

const HomePage = () => {
  const [currencies, setCurrencies] = useState([]);
  const [state, setState] = useState({
    origin: "USD",
    destination: "USD",
    input: "",
    output: "",
  });

  useEffect(() => {
    initializer();
  }, []);

  const initializer = async () => {
    try {
      const resp = await fetch("/currency-conversion/getAll");
      if (res?.error) return;
      const result = await resp.json();
      setCurrencies(result);
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = (type, value) => {
    setState((prevSate) => {
      let newState = { ...prevSate };
      newState[type] = value;
      return newState;
    });
  };

  const onClickCalculate = async () => {
    try {
      const url = `/currency-conversion?from=${state.origin}&to=${state.destination}&amount=${state.input}`;
      const resp = await fetch(url);
      const result = await resp.json();
      if (result.error) throw new Error("Error in server");
      const output = result?.data?.converted_amount;
      setState((prevSate) => {
        let newState = { ...prevSate };
        newState.output = output.toFixed(2);
        return newState;
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout sideNav={undefined}>
      <BaseHeaderLayout
        title="Currency Conversion"
        subtitle="Convert any value between currencies."
        as="h2"
      />

      <ContentLayout>
        <Container>
          <CurrencyView
            label="Origin Currency"
            currencies={currencies}
            value={state.input}
            changeCurrencyHandler={(value) => changeHandler("origin", value)}
            changeValueHandler={(value) => changeHandler("input", value)}
          />
          <CurrencyView
            label="Destination Currency"
            currencies={currencies}
            disabledInput={true}
            value={state.output}
            changeCurrencyHandler={(value) =>
              changeHandler("destination", value)
            }
          />
        </Container>
        <Button onClick={onClickCalculate}>Calculate</Button>
        <button
          className="SS_ProductCheckout"
          type="button"
          data-id="1"
          data-email="test@mail.com"
          data-url="http://localhost:1337"
          // @ts-ignore
          onClick={(e)=>{console.log("clicked010"); onClickBuyButton(e)}}
        >
          Buy Now
        </button>
      </ContentLayout>
    </Layout>
  );
};

export default HomePage;
