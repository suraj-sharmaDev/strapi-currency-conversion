"use strict";

module.exports = ({ strapi }) => ({
  getWelcomeMessage() {
    return "Welcome to Strapi 🚀";
  },

  async getAll() {
    const result = await strapi.entityService.findMany(
      "plugin::currency-conversion.currency",
      {}
    );
    return result;
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
        // const resp = await fetch(
        //   `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
        // );
        // const result = await resp.json();
        // const { rates } = result;
        const relativeUSDFrom = await strapi.db
          .query("plugin::currency-conversion.currency")
          .findOne({
            where: { name: from },
          });

        const relativeUSDTo = await strapi.db
          .query("plugin::currency-conversion.currency")
          .findOne({
            where: { name: to },
          });

        if (!relativeUSDFrom) {
          message.error = true;
          message.messages = ["No stored data for " + from];
          return message;
        }

        if (!relativeUSDTo) {
          message.error = true;
          message.messages = ["No stored data for " + to];
          return message;
        }

        const fromUsdValue = relativeUSDFrom.relativeUSDValue * amount;
        const convertedToValue = fromUsdValue / relativeUSDTo.relativeUSDValue;

        message.data = {
          from,
          to,
          amount,
          converted_amount: convertedToValue,
        };
        return message;
      } catch (error) {
        console.log(error);
        message.error = true;
        message.messages = [error.message];
        return message;
      }
    }
  },
  async create(data) {
    try {
      return await strapi.db
        .query("plugin::currency-conversion.currency")
        .create({
          data,
        });
    } catch (error) {
      console.log(error);
      return { error: true, message: error.message };
    }
  },
  async delete(id) {
    return await strapi.entityService.delete(
      "plugin::currency-conversion.currency",
      id
    );
  },
  async update(id, data) {
    return await strapi.entityService.update(
      "plugin::currency-conversion.currency",
      id,
      { data }
    );
  },
});
