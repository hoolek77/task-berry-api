import { createParamDecorator } from '@nestjs/common';
import { User } from './interfaces/user.interface';

export const GetUser = createParamDecorator(
  (data, req): User => {
    return req.user;
  },
);
