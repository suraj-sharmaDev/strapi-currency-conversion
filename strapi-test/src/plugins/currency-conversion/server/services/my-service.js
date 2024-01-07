"use strict";

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  },

  async getCurrencyConversion(from, to, amount) {
    let message = {
      error: false,
      messages: [],
      data: null,
    };
    if (!from || !to || !amount) {
      message.error = true;
      message.messages = [
        ...(!from ? ["Please specify origin currency"] : []),
        ...(!to ? ["Please specify destination currency"] : []),
        ...(!amount ? ["Please specify amount to convert"] : []),
      ];

      return message;
    } else {
      try {
        const resp = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        );
        const result = await resp.json();
        const { rates } = result;
        message.data = {
          from,
          to,
          amount,
          converted_amount: rates?.[to.toUpperCase()],
        };
        return message;
      } catch (error) {
        message.error = true;
        message.messages = [error.message];
        return message;
      }
    }
  },
});
