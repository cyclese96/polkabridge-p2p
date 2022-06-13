const request = require("supertest");
const auth = require("../middleware/auth");
const User = require("../models/User");
const { getTestToken } = require("../_helpers/password-service");
const mongoose = require("mongoose");

app = require("../app");

describe("Order transactions", () => {
  describe("Buy order trandaction", () => {
    test("Should respond to order trx", async () => {
      await request(app).get("/auth-apis/v1/users/test").expect(200);
    });
  });

  describe("Sell order trandaction", () => {
    test("Should respond to  order trx", async () => {
      await request(app).get("/auth-apis/v1/users/test").expect(200);
    });
  });
});
