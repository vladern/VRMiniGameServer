import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass } from "@typegoose/typegoose";

@ObjectType({ description: "The User model" })
export class User {

    @Field(() => ID)
    id: number;  

    @Field()
    @Property({ required: true })
    username: string;

    @Field()
    @Property({ required: true })
    firstName: string;

    @Field()
    @Property({ required: true })
    lastName: string;

    @Field()
    @Property({ required: true })
    email: string;
}

export const UserModel = getModelForClass(User);