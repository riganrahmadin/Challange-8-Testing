const request = require("supertest");
const app = require("../../../app");
const email = `member${Math.random().toString().substring(12)}@binar.co.id`;

describe("POST /v1/auth/register", () => {
  it("should response with 201 as status code", async () => {
    const name = "Testing";
    const password = "password";

    return request(app)
      .post("/v1/auth/register")
      .set("Content-Type", "application/json")
      .send({ name, email, password })
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res.body).toEqual(
          expect.objectContaining({
            ...res.body,
          })
        );
      });
  });

  it("should response with 500 as status code", async () => {
    const name = "Email has beed taken";
    const password = "password";

    return request(app)
      .post("/v1/auth/register")
      .set("Content-Type", "application/json")
      .send({ name, email, password })
      .then((res) => {
        expect(res.statusCode).toBe(500);
        expect(res.body).toEqual(
          expect.objectContaining({
            error: {
              name: expect.any(String),
              message: expect.any(String),
              details: null,
            },
          })
        );
      });
  });
});
