import { Model } from "pinia-orm";
import { Attr, Str, Cast, HasMany, OnDelete } from "pinia-orm/decorators";
import { DateCast } from "pinia-orm/casts";
import PersonDocument from "~/models/PersonDocument";
import PersonCard from "~/models/PersonCard";
import type { Gender } from "~/types";
import type { Person as TPerson } from "~/types/persons";

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

  @HasMany(() => PersonDocument, "person_id")
  @OnDelete("cascade")
  declare documents?: PersonDocument[];

  @HasMany(() => PersonCard, "person_id")
  @OnDelete("cascade")
  declare cards?: PersonCard[];

  static created(person: Person) {
    useNuxtApp().$capi<TPerson>("persons", {
      method: "POST",
      body: new URLSearchParams(person.$getAttributes() as any),
      onResponseError({ request, options, response }) {
        //
      },
    });
  }

  static updated(person: Person) {
    useNuxtApp().$capi<TPerson>(`persons/${person.id}`, {
      method: "PUT",
      body: new URLSearchParams(person.$getAttributes() as any),
      onResponseError({ request, options, response }) {
        //
      },
    });
  }

  static deleted(person: Person) {
    useNuxtApp().$capi<TPerson>(`persons/${person.id}`, {
      method: "DELETE",
      onResponseError({ request, options, response }) {
        //
      },
    });
  }
}
