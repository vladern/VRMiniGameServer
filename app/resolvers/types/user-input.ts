import { Length, IsEmail } from "class-validator";
import { User } from "../../entities/Users";
import { ObjectId } from "mongodb";
import { InputType, Field, ID } from "type-graphql";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  @Length(1, 255)
  username: String;

  @Field()
  @IsEmail()
  email: String;

  @Field(()=> ID)
  user_id: ObjectId;  
}