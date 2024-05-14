import { Model } from "pinia-orm";
import { Attr, Str, Cast, BelongsTo } from "pinia-orm/decorators";
import { DateCast } from "pinia-orm/casts";
import Person from "~/models/Person";
import type { TCountryCode } from "countries-list";
import type { DocumentType } from "~/types";
import type { PersonDocument as TPersonDocument } from "~/types/persons";

export default class PersonDocument extends Model {
  static entity = "person_documents";

  @Attr() declare id: number;
  @Attr() declare person_id: number;
  @Str("") declare issued_by: TCountryCode;
  @Str("") declare type: DocumentType;
  @Str("") declare number: string;
  @Cast(() => DateCast) @Attr() declare issue_date: Date;
  @Cast(() => DateCast) @Attr() declare expiry_date: Date;
  @Str("") declare first_name: string;
  @Str("") declare last_name: string;
  @Str("") declare middle_name: string | null;

  @BelongsTo(() => Person, "person_id") declare person: Person | null;

  static creating(document: PersonDocument) {
    document.$isDirty() &&
      useNuxtApp().$capi<TPersonDocument>(`persons/${document.person_id}/documents`, {
        method: "POST",
        body: new URLSearchParams(document.$getAttributes() as any),
        onResponseError({ request, options, response }) {
          //
        },
      });
  }

  static updating(document: PersonDocument) {
    document.$isDirty() &&
      useNuxtApp().$capi<TPersonDocument>(`persons/${document.person_id}/documents/${document.id}`, {
        method: "PUT",
        body: new URLSearchParams(document.$getAttributes() as any),
        onResponseError({ request, options, response }) {
          //
        },
      });
  }

  static deleting(document: PersonDocument) {
    useNuxtApp().$capi<TPersonDocument>(`persons/${document.person_id}/documents/${document.id}`, {
      method: "DELETE",
      onResponseError({ request, options, response }) {
        //
      },
    });
  }
}
