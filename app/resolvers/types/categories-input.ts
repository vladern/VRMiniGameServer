import { InputType, Field } from "type-graphql";
import { Length } from "class-validator";
import { Categories } from "../../entities/Categories";
import { ObjectId } from "mongodb";

@InputType()
export class CategoriesInput implements Partial<Categories> {

  @Field()
  name: string;

  @Field()
  @Length(1, 255)
  description: String;

  @Field(()=> String)
  category_id: ObjectId;

}