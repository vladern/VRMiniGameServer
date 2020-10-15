import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { User, UserModel } from "../entities/Users";
import { UserInput } from "./types/user-input";
import { UserDAO } from "../dao/user.dao";
import { isEmailFormat } from "../helpers/validators";
import { ValidationError } from "apollo-server-express";

@Resolver()
export class UserResolver {
  @Query((_returns) => User, { nullable: false })
  async returnSingleUser(@Arg("id") id: string) {
    return await UserModel.findById({ _id: id });
  }

  @Query(() => [User])
  async returnAllUsers() {
    return await UserModel.find();
  }

  @Mutation(() => User)
  async createUser(@Arg("data") userInput: UserInput): Promise<User> {
    const userDAO: UserDAO = new UserDAO();

    if (!isEmailFormat(userInput.email)) {
      throw new ValidationError('Is not valid email');
    }
    
    if (userInput.password.length < 6) {
      throw new ValidationError('Password length must be greater than 6 chars');
    }

    const isUnicUsername = await userDAO.isUnicUsername(userInput.username);
    if (!isUnicUsername) {
      throw new ValidationError('This username is already exists!');
    }

    const isUnicEmail = await userDAO.isUnicEmail(userInput.email);
    if (!isUnicEmail) {
      throw new ValidationError('This email is already exists!');
    }

    return userDAO.createNewUser(userInput);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string) {
    await UserModel.deleteOne({ id });
    return true;
  }
}
