import request from "supertest";
import app from "../../src/app";

describe(
  "Health Endpoint",
  () => {

    it(
      "should return healthy response",
      async () => {

        const response =
          await request(app)
            .get("/health");

        expect(
          response.status
        ).toBe(200);

        expect(
          response.body.success
        ).toBe(true);
      }
    );
  }
);