import { Model } from "pinia-orm";
import { Attr, Str, Cast, HasMany } from "pinia-orm/decorators";
import { DateCast } from "pinia-orm/casts";
import PersonDocument from "~/models/PersonDocument";
import PersonCard from "~/models/PersonCard";
import type { Gender } from "~/types";

export default class Person extends Model {
  static entity = "people";

  @Attr(null) declare id: number;
  @Str("") declare name: string;
  @Str("") declare gender: Gender;
  @Cast(() => DateCast) @Attr() declare birth_date: Date;
  @Str("") declare phone: string | null;
  @Str("") declare email: string | null;
  @Cast(() => DateCast) @Attr() declare created_at: Date;
  @Cast(() => DateCast) @Attr() declare updated_at: Date;

  @HasMany(() => PersonDocument, "person_id") declare documents?: PersonDocument[];
  @HasMany(() => PersonCard, "person_id") declare cards?: PersonCard[];
}
