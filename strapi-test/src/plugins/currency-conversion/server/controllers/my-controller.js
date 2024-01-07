'use strict';

module.exports = ({ strapi }) => ({
  async index(ctx) {
    const {from, to, amount} = ctx.request.query;
    ctx.body = await strapi
      .plugin('currency-conversion')
      .service('myService')
      .getCurrencyConversion(from, to, amount);
  },
});
