import { Length, IsEmail } from "class-validator";
import { User } from "../../entities/Users";
import { InputType, Field } from "type-graphql";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  @Length(1, 255)
  username: String;

  @Field()
  @IsEmail()
  email: String; 
}