import React from "react";
import styled from "styled-components";

const id = Math.floor(Math.random() * 100) + "";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  padding: 10px;
  justify-content: start;
  align-items: start;
  gap: 16px;
  width: 40%;
`;

const Select = styled.select`
  width: 200px;
  padding: 3px;
`;

export default function CurrencyView({
  label = "This is label",
  value = null,
  currencies = [],
  disabledInput = false,
  changeCurrencyHandler = (value) => {},
  changeValueHandler = (value) => {},
}) {
  return (
    <Container>
      <div>
        <label htmlFor={id}>{label}</label>
        <Select
          name={id}
          id={id}
          onChange={(e) => changeCurrencyHandler(e.target.value)}
        >
          {currencies.map((c, idx) => (
            <option key={idx.toString()} value={c.name}>
              {c.name}
            </option>
          ))}
        </Select>
      </div>
      <div>
        <label>{disabledInput ? "Output Amount" : "Enter Amount"}</label>
        <input
          type="number"
          disabled={disabledInput}
          value={value}
          onChange={(e) => changeValueHandler(e.target.value)}
        />
      </div>
    </Container>
  );
}
