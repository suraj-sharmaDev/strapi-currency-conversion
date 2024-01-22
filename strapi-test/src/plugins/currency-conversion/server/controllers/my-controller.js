"use strict";

module.exports = ({ strapi }) => ({
  async index(ctx) {
    const { from, to, amount } = ctx.request.query;
    ctx.body = await strapi
      .plugin("currency-conversion")
      .service("myService")
      .getCurrencyConversion(from, to, amount);
  },
  async getAll(ctx) {
    try {
      ctx.body = await strapi
        .plugin("currency-conversion")
        .service("myService")
        .getAll();
    } catch (error) {
      ctx.throw(500, error);
    }
  },
  async create(ctx) {
    try {
      ctx.body = await strapi
      .plugin("currency-conversion")
      .service("myService")
      .create(ctx.request.body);
    } catch (error) {
      ctx.throw(500, error);
    }
  },
  async update(ctx) {
    try {
      ctx.body = await strapi
      .plugin("currency-conversion")
      .service("myService")
      .update(ctx.params.id, ctx.request.body);
    } catch (error) {
      ctx.throw(500, error);
    }
  },
  async delete(ctx) {
    try {
      ctx.body = await strapi
      .plugin("currency-conversion")
      .service("myService")
      .delete(ctx.params.id);
    } catch (error) {
      ctx.throw(500, error);
    }
  }
});
