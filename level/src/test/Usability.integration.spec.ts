import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { Server } from "../Server";
const jwt = require("jsonwebtoken");

describe("usability", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(PlatformTest.bootstrap(Server));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

  it("should return options for admin role", async () => {
      const token = jwt.sign({ firstName: "Alice", role: "admin" }, "admin-secret", {
          algorithm: "HS256",
      });
      const response = await request
         .get("/options")
         .query({secret: 'secret'})
         .set('authorization', `bearer ${token}`).expect(200);

      expect(response.text).toContain("Admin options");
  });

  it("should return options for user role", async () => {
      const token = jwt.sign({ firstName: "James", role: "user" }, "user-secret", {
          algorithm: "HS256",
      });
      const response = await request
          .get("/options")
          .query({secret: 'secret'})
          .set('authorization', `bearer ${token}`).expect(200);

      expect(response.text).toContain("User options");
  });
});
