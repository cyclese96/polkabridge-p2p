const request = require("supertest");
const auth = require("../middleware/auth");
const User = require("../models/User");
const { getTestToken } = require("../_helpers/password-service");
const mongoose = require("mongoose");

app = require("../app");

// const Admin = require("../models/Admin");
let userAHeader, userBHeader, invalidUserHeader;

beforeAll(async () => {
  // console.log("##### before all ######");

  await mongoose.connect(process.env.TEST_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: process.env.DB,
  });

  const jwtPayloadA = {
    user: {
      id: "628a8c19fae6444d49162761",
      address: "0x9d1599C943AaDb3c0A1964d159113dF913E08f64",
      name: "amir alam",
    },
  };
  const jwtTokenA = await getTestToken(jwtPayloadA);
  userAHeader = {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "x-auth-token": jwtTokenA,
  };

  const jwtPayloadB = {
    user: {
      id: "625860aa1ed2eb5da6dd76c1",
      address: "0xac113A863e871Ca007dD1be8BE12563602502A6D",
      name: "Tahir",
    },
  };
  const jwtTokenB = await getTestToken(jwtPayloadB);
  userBHeader = {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "x-auth-token": jwtTokenB,
  };

  invalidUserHeader = {
    "Content-Type": "application/json;charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
    "x-auth-token": "",
  };
});

beforeEach(async () => {
  // console.log("##### before each ######");
  // await Admin.deleteMany({ email: "test@test.com" });
});
afterAll(async () => {
  // console.log("##### after all  ######");
  mongoose.disconnect(() => {
    console.log("database connection closed");
  });
});

describe("Auth routes", () => {
  test("Should respond to auth routes", async () => {
    await request(app).get("/auth-apis/v1/users/test").expect(200);
  });

  test("Should fetch correct user with correct headers", async () => {
    const res = await request(app)
      .get("/auth-apis/v1/user/")
      .set(userAHeader)
      .expect(200);
  });

  test("Should show correct response status on failure", async () => {
    await request(app)
      .get("/auth-apis/v1/user/")
      .set(invalidUserHeader)
      .expect(401);
  });
});
