import { Controller, Get, HeaderParams, QueryParams } from "@tsed/common";
import {JwtPayload} from "jsonwebtoken";
import {BadRequest} from "@tsed/exceptions";
const jwt = require("jsonwebtoken");
const secret = 'some-secret';

@Controller("/options")
export class Options {
  @Get("/")
  get(@HeaderParams('authorization') auth: string) {
      const token = auth.replace('bearer ', '');
      return getOptions(token);
  }
}

const getOptions = (token: string) => {
    if(!jwt.verify(token, secret, { algorithm: "HS256" })) {
        throw new BadRequest('Authorization failed');
    }
    if (decodeJWT(token).role === 'admin') {
        return 'Admin options'
    } else {
       return 'User options'
    }
}

const decodeJWT = (token: string, json = true): JwtPayload => {
    try {
        return jwt.decode(token, { json }) as JwtPayload;
    } catch (e) {
        throw new BadRequest('Error while decoding JWT');
    }
};
