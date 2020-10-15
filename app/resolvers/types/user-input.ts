import { Length, IsEmail } from "class-validator";
import { User } from "../../entities/Users";
import { InputType, Field } from "type-graphql";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  @Length(1, 255)
  firstName: string;

  @Field()
  @Length(1, 255)
  lastName: string;

  @Field()
  @Length(1, 255)
  username: string;

  @Field()
  @IsEmail()
  email: string; 

  @Field()
  @Length(1,255)
  password: string;
}