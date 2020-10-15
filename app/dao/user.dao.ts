import { PasswordModel } from "../entities/Password";
import { User, UserModel } from "../entities/Users";
import { UserInput } from "../resolvers/types/user-input";
import * as bcrypt from "bcrypt";

export class UserDAO {
  constructor() {}

  async createNewUser({
    username,
    email,
    firstName,
    lastName,
    password,
  }: UserInput): Promise<User> {
    const user = (
      await UserModel.create({ username, email, firstName, lastName })
    ).save();

    (
      await PasswordModel.create({
        passwordHash: await bcrypt.hash(
          password,
          Number.parseInt(process.env.HASH_SALT_ROUNDS as string)
        ),
        email: email,
      })
    ).save();

    return user;
  }

  async isUnicUsername(username: string): Promise<boolean> {
      const filtredUsers = (await UserModel.find()).filter(elem => elem.username === username);
      const isUnic = filtredUsers.length === 0;
    return isUnic;
  }

  async isUnicEmail(email: string): Promise<boolean> {
    const filtredUsers = (await UserModel.find()).filter(elem => elem.email === email);
    const isUnic = filtredUsers.length === 0;
  return isUnic;
}
}
