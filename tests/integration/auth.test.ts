import request from "supertest";

import app from "../../src/app";

describe(
  "Auth APIs",
  () => {

    const user = {
      fullName: "Test User",

      email:
        `test_${Date.now()}@mail.com`,

      password: "123456"
    };

    let refreshToken = "";

    it(
      "should register user",
      async () => {

        const response =
          await request(app)
            .post(
              "/api/auth/register"
            )
            .send(user);

        expect(
          response.status
        ).toBe(201);

        expect(
          response.body.success
        ).toBe(true);

        expect(
          response.body.data.user
        ).toBeDefined();

        expect(
          response.body.data.accessToken
        ).toBeDefined();

        expect(
          response.body.data.refreshToken
        ).toBeDefined();
      }
    );

    it(
      "should login user",
      async () => {

        const response =
          await request(app)
            .post(
              "/api/auth/login"
            )
            .send({
              email:
                user.email,

              password:
                user.password
            });

        expect(
          response.status
        ).toBe(200);

        expect(
          response.body.success
        ).toBe(true);

        expect(
          response.body.data.user
        ).toBeDefined();

        expect(
          response.body.data.accessToken
        ).toBeDefined();

        expect(
          response.body.data.refreshToken
        ).toBeDefined();

        refreshToken =
          response.body.data
            .refreshToken;
      }
    );

    it(
      "should refresh token",
      async () => {

        const response =
          await request(app)
            .post(
              "/api/auth/refresh"
            )
            .send({
              refreshToken
            });

        expect(
          response.status
        ).toBe(200);

        expect(
          response.body.success
        ).toBe(true);

        expect(
          response.body.data.accessToken
        ).toBeDefined();

        expect(
          response.body.data.refreshToken
        ).toBeDefined();

        // IMPORTANT:
        // refresh token rotation
        refreshToken =
          response.body.data
            .refreshToken;
      }
    );

    it(
      "should logout user",
      async () => {

        const response =
          await request(app)
            .post(
              "/api/auth/logout"
            )
            .send({
              refreshToken
            });

        expect(
          response.status
        ).toBe(200);

        expect(
          response.body.success
        ).toBe(true);
      }
    );

    it(
      "should reject reused refresh token",
      async () => {

        const loginResponse =
          await request(app)
            .post(
              "/api/auth/login"
            )
            .send({
              email:
                user.email,

              password:
                user.password
            });

        const oldRefreshToken =
          loginResponse.body.data
            .refreshToken;

        const refreshResponse =
          await request(app)
            .post(
              "/api/auth/refresh"
            )
            .send({
              refreshToken:
                oldRefreshToken
            });

        expect(
          refreshResponse.status
        ).toBe(200);

        const reusedResponse =
          await request(app)
            .post(
              "/api/auth/refresh"
            )
            .send({
              refreshToken:
                oldRefreshToken
            });

        expect(
          reusedResponse.status
        ).toBe(401);

        expect(
          reusedResponse.body.success
        ).toBe(false);
      }
    );
  }
);