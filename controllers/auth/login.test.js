const  login  = require("./login");
const {User} = require("../../models");

describe("user login controller test", () => {

  test("request login returns status, token, email and subscription", async () => {

    const email = "qwerty@gmail.com";

    const req = {
      body : {
      email: "valeo@gmail.com",
      password: "12345678"
      }
    }

    const user = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      password:'12345678',
      code: 200,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzY2Y5YWJmY2M5ODEzYmU5NGU0ZjhhOSIsImlhdCI6MTY3NDY1MDY1NiwiZXhwIjoxNjc0NjU0MjU2fQ.2oNeOkiYE_grSkAD-1i9ECCjxlXKlxNwO1h-QbiW5ew",
      user: {
        email: "valeo@gmail.com",
        subscription: "starter"
      },
    }

    const res = {
      json: jest.fn(),
      status() {
        return 200
      },
      token: 'token',
      password:"12345678",

      user: {
        email: "valeo@gmail.com",
        subscription: 'starter',
        password:"88888888"
      }
    }

    jest.spyOn(User, "findOne").mockImplementationOnce(() => user)
    const  result = await login(req,res);
    console.log("result", result);
    expect(result.user.email).toEquel(email);
  })
})



// const express = require("express");
// const request = require("supertest");

// const {ctrlWrapper} = require("../../middlewares");
// const {auth: ctrl} = require('../../controllers');

// const app = express();
// const router = express.Router();
// router.post('/login', ctrlWrapper(ctrl.login));

// app.use(express.json());

// const server = app.listen(3000)

// describe("user login controller test", () => {
//   beforeAll(() => server);

//   test("request login returns status, token, email and subscription", async () => {
//     const response = await request(app).post("/api/users/login");

//     expect(response.status).toBe(200);

//     expect(typeof (response.body)).toBe('object');

//     const { user } = response.body;
//     expect(typeof response.body.token).toBe("string");
//     expect(typeof user.email).toBe("string");
//     expect(typeof user.subscription).toBe("string");
//   })

// })