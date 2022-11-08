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

    it("should return bad request", async () => {
        const token = jwt.sign({ firstName: "Hacker", role: "admin" }, "hacker-build-secret", {
            algorithm: "HS256",
        });
        await request.get("/options").set('authorization', `bearer ${token}`).expect(500);
    });
});
