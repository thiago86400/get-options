import { Controller, Get, HeaderParams, QueryParams } from "@tsed/common";
import {JwtPayload} from "jsonwebtoken";
import {BadRequest} from "@tsed/exceptions";
const jwt = require("jsonwebtoken");


@Controller("/options")
export class Options {
  @Get("/")
  get(@QueryParams('secret') secret: string, @HeaderParams('authorization') auth: string) {
      const token = auth.replace('bearer ', '');
      return getOptions(token, secret);
  }
}

const getOptions = (token: string, secret: string) => {
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
