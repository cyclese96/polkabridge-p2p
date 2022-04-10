const request = require("supertest");

const app = require("../app");
// const Admin = require("../models/Admin");

// beforeEach(async () => {
//   //   console.log("clear test users");
//   await Admin.deleteMany({ email: "test@test.com" });
// });

describe("Auth routes", () => {
  test("Should respond to auth routes", async () => {
    await request(app).get("/api/auth/v1/__test").expect(200);
  });
});

describe("Order routes", () => {
  test("Should respond to order routes", async () => {
    await request(app).get("/api/orders/v1/__test").expect(200);
  });
});
