import type { Gender, DocumentType } from "~/types";

export interface Person {
  id: number;
  name: string;
  gender: Gender;
  birth_date: Date;
  phone?: string;
  email?: string;
  created_at: Date;
  updated_at: Date;
  documents: PersonDocument[];
  cards: PersonCard[];
}

export interface PersonDocument {
  id: number;
  person_id: number;
  issued_by: string;
  type: DocumentType;
  number: string;
  issue_date: Date;
  expiry_date: Date;
  first_name: string;
  last_name: string;
  middle_name?: string;
}

export interface PersonCard {
  id: number;
  person_id: number;
  airline: string;
  number: string;
}
