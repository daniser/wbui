import BIRTHDAY_NOTIFICATION from "~/utils/masks/birth_certificate";
import type { DocumentType } from "~/types";
import type { MaskitoOptions } from "@maskito/core";

const documentMasks: Partial<Record<DocumentType, MaskitoOptions>> = {
  INTERNAL: { mask: [/\d/, /\d/, " ", /\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] },
  FOREIGN: { mask: [/\d/, /\d/, " ", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/] },
  PASSPORT: { mask: /^\w{1,16}$/ },
  BIRTHDAY_NOTIFICATION,
  OFFICERID: { mask: /^\d{1,6}$/ },
  MILITARYID: { mask: /^\d{1,6}$/ },
  SEAMANSID: { mask: /^\d{1,6}$/ },
  RETURNID: { mask: /^\d{1,6}$/ },
};

export default documentMasks;
