import { PlatformTest } from "@tsed/common";
import SuperTest from "supertest";
import { Options } from "../controllers/options";
import { Server } from "../Server";
const jwt = require("jsonwebtoken");

describe("security", () => {
  let request: SuperTest.SuperTest<SuperTest.Test>;

  beforeEach(PlatformTest.bootstrap(Server, {
    mount: {
      "/": [Options]
    }
  }));
  beforeEach(() => {
    request = SuperTest(PlatformTest.callback());
  });

  afterEach(PlatformTest.reset);

    it("should return options for user role", async () => {
        const token = jwt.sign({ firstName: "Hacker", role: "admin" }, "hacker-build-secret");
        const response = await request
            .get("/options")
            .query({secret: 'secret'})
            .set('authorization', `bearer ${token}`).expect(200);

        expect(response.text).toContain("User options");
    });
});
