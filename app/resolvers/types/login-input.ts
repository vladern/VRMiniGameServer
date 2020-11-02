import { User } from "../../entities/Users";
import { Field, InputType } from "type-graphql";
import { IsEmail, Length } from "class-validator";

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  @IsEmail()
  email: string; 

  @Field()
  @Length(1,255)
  password: string;
}