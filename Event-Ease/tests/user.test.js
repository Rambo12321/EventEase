import app from "../app.js";
import request from "supertest";

describe("User API", () => {
  it("Should return all users", async () => {
    const res = await request(app).get("/user");

    expect(res.statusCode).toBe(200);

    expect(Array.isArray(res.body)).toBe(true);

    if (res.body.length > 0) {
      expect(res.body[0]).toHaveProperty("id");
      expect(res.body[0]).toHaveProperty("email");
      expect(res.body[0]).toHaveProperty("name");
      expect(res.body[0]).toHaveProperty("role");
    }
  });
});
