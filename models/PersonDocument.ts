import { Model } from "pinia-orm";
import { Attr, Str, Cast, BelongsTo } from "pinia-orm/decorators";
import { DateCast } from "pinia-orm/casts";
import Person from "~/models/Person";
import type { DocumentType } from "~/types";

export default class PersonDocument extends Model {
  static entity = "person_documents";

  @Attr(null) declare id: number | null;
  @Str("") declare issued_by: string;
  @Str("") declare type: DocumentType;
  @Str("") declare number: string;
  @Cast(() => DateCast) @Attr() declare issue_date: Date;
  @Cast(() => DateCast) @Attr() declare expiry_date: Date;
  @Str("") declare first_name: string;
  @Str("") declare last_name: string;
  @Str("") declare middle_name: string | null;

  @BelongsTo(() => Person, "person_id") declare person: Person | null;
}
