import { Repository } from "pinia-orm";
import Person from "~/models/Person";
import type { Person as TPerson } from "~/types/persons";

export default class PersonRepository extends Repository<Person> {
  use = Person;

  fetch = async () => {
    return this.insert(await useNuxtApp().$capi<TPerson[]>("persons"));
  };
}
