import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}
export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {

    const userRepository = getRepository(User);

    const user  = await userRepository.findOne({ where: { email }});

    if(!user){
      throw new Error('Incorrect email/password combination')
    }

    const passwordMatched = await compare(password, user.password);

    if(!passwordMatched){
      throw new Error('Incorrect email/password combination')
    }

    const token = sign({}, '335a10cfbd808401ec4804ca0ae8c9f1', {
      subject: user.id,
      expiresIn: '1d',
    });
    return{
      user,
      token,
    };

  }
}