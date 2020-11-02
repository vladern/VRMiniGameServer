import { Resolver, Mutation, Arg, Query } from "type-graphql";
import { User, UserModel } from "../entities/Users";
import { LoginResponse } from "../entities/LoginResponse";
import { UserInput } from "./types/user-input";
import { UserDAO } from "../dao/user.dao";
import { isEmailFormat } from "../helpers/validators";
import { ValidationError } from "apollo-server-express";
import jwt from "jsonwebtoken";
import { LoginInput } from "./types/login-input";

@Resolver()
export class UserResolver {
  private _userDAO: UserDAO = new UserDAO();

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
    if (!isEmailFormat(userInput.email)) {
      throw new ValidationError("Is not valid email");
    }

    if (userInput.password.length < 6) {
      throw new ValidationError("Password length must be greater than 6 chars");
    }

    const isUnicUsername = await this._userDAO.isUnicUsername(
      userInput.username
    );
    if (!isUnicUsername) {
      throw new ValidationError("This username is already exists!");
    }

    const isUnicEmail = await this._userDAO.isUnicEmail(userInput.email);
    if (!isUnicEmail) {
      throw new ValidationError("This email is already exists!");
    }

    return this._userDAO.createNewUser(userInput);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: string) {
    await UserModel.deleteOne({ id });
    return true;
  }

  @Query(() => LoginResponse, { nullable: false })
  async login(@Arg("data") userInput: LoginInput) {
    try {
      const user = await this._userDAO.findUserByEmail(userInput.email);
      if (!user) {
        throw new Error("No user with that email");
      }
      const isValidPassword = await this._userDAO.isValidPassword(
        userInput.password,
        user
      );
      if (!isValidPassword) {
        throw new Error("Incorrect password");
      }

      // TODO: refactor to Busyness Object
      if (process.env.JWT_SECRET) {
        const secretToken: string = process.env.JWT_SECRET;
        const token = jwt.sign(
          { id: user.id, email: user.email },
          secretToken,
          { expiresIn: "1d" }
        );
        const loginResponse: LoginResponse = { token };
        return loginResponse;
      } else {
        throw new Error("Internal Error, no token to sign found !!");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
