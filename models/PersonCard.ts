import { Model } from "pinia-orm";
import { Attr, Str, BelongsTo } from "pinia-orm/decorators";
import Person from "~/models/Person";

export default class PersonCard extends Model {
  static entity = "person_cards";

  @Attr(null) declare id: number | null;
  @Str("") declare airline: string;
  @Str("") declare number: string;

  @BelongsTo(() => Person, "person_id") declare person: Person | null;
}
