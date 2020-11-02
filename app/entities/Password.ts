import { ObjectType, Field } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

@ObjectType({ description: "The User model" })
export class Password {
    @Field()
    @Property({ required: true })
    email: string;

    @Field()
    @Property({ required: true })
    passwordHash: string;
}

export const PasswordModel = getModelForClass(Password);