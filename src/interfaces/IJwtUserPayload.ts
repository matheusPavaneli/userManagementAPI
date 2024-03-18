import { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';

export default interface IJwtUserPayload extends JwtPayload, Request {
  id: string;
  username: string;
  email: string;
}
