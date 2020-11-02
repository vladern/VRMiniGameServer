import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class LoginResponse {
  @Field()
  token: string;
}