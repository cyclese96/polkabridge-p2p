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
  console.log("connection state", mongoose.connection.readyState);

  await mongoose.disconnect();

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
  // // reset users to initial state
  const userAiId = "628a8c19fae6444d49162761";
  const userAPayload = {
    email: "aamiralam1992@gmail.com",
    name: "Aamir Alam",
    phone: "8355038185",
    fiat: "6267e54c3c805016884e50f9",
  };

  await User.findByIdAndUpdate(userAiId, userAPayload);

  const userBId = "625860aa1ed2eb5da6dd76c1";
  const userBPayload = {
    email: "aamiralam1991@gmail.com",
    phone: "8355038184",
    name: "Tahir",
    fiat: "6263a50d54f64766e549a621",
  };
  await User.findByIdAndUpdate(userBId, userBPayload);

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

  test("Should update correct user fields", async () => {
    const updatePayload = {
      name: "Amir siddiaui",
      email: "amirsiddiqu420@gmail.com",
      phone: "1722140922",
    };
    const updatedUser = await request(app)
      .put("/auth-apis/v1/user/")
      .send(updatePayload)
      .set(userAHeader)
      .expect(201);

    expect({
      name: updatedUser?.body?.name,
      email: updatedUser?.body?.email,
      phone: updatedUser?.body?.phone,
    }).toEqual(updatePayload);
  });

  test("Should update correct fiat", async () => {
    const updatePayload = {
      fiat: "6263a50d54f64766e549a621",
    };
    const updatedUser = await request(app)
      .put("/auth-apis/v1/user/")
      .send(updatePayload)
      .set(userAHeader)
      .expect(201);

    expect({
      fiat: updatedUser?.body?.fiat?._id,
    }).toEqual(updatePayload);
  });
});
