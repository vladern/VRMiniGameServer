import { ObjectType, Field } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

@ObjectType({ description: "The User model" })
export class Password {
    @Field()
    @Property({ required: true })
    email: String;

    @Field()
    @Property({ required: true })
    passwordHash: String;
}

export const PasswordModel = getModelForClass(Password);