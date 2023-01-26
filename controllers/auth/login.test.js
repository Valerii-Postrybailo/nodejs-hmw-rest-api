const express = require("express");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

const { User } = require("../../models");

dotenv.config();

const app = express();

app.use(express.json());

const login  = require("./login");

const password = "avatar"
const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

describe("user login controller test", () => {

  jest.setTimeout(60000);

  test("Login test", async () => {

    const user = {
      body: {
        email: "avatar@email.com",
        password: "avatar",
      }
    };

    const mRes = {
      _id: "534535",
      token: "kdlsfdfsklsfnd",
      password: hashPassword,

      status: jest.fn().mockReturnThis(),
      json: jest.fn(),

      user: {
        email: "avatar@email.com",
        subscription: "starter"
      }
    };

    jest.spyOn(User, "findOne").mockImplementationOnce(() => mRes)
    jest.spyOn(User, "findOneAndUpdate").mockImplementationOnce(() => mRes)

    await login(user, mRes);

    expect(mRes.status).toBeCalledWith(200);
    expect(mRes.token).toEqual(expect.anything());
    expect(mRes.user.email).toEqual("avatar@email.com");
    expect(mRes.user.subscription).toEqual("starter");
  })
})
