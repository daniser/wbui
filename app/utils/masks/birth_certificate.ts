import type { MaskitoOptions } from "@maskito/core";
import type { ElementState } from "@maskito/core/src/lib/types";

const slice = (elementState: ElementState): [string, string, string] => [
  elementState.value.slice(0, elementState.selection[0]),
  elementState.value.slice(...elementState.selection),
  elementState.value.slice(elementState.selection[1]),
];

const birthCertificateMask: MaskitoOptions = {
  mask: /^[IVXLCDM]{0,4}(-[А-ЯЁ]{0,2})?( \d{0,6})?$/,
  preprocessors: [
    ({ elementState, data }, actionType) =>
      actionType === "insert" && /^[А-ЯЁ]$/i.test(data) && /[IVXLCDM]$/.test(slice(elementState)[0])
        ? { elementState, data: "-" + data }
        : { elementState, data },

    ({ elementState, data }, actionType) =>
      actionType === "insert" && /^\d$/.test(data) && /[А-ЯЁ]{1,2}$/.test(slice(elementState)[0])
        ? { elementState, data: " " + data }
        : { elementState, data },

    ({ elementState, data }, actionType) => {
      if (actionType !== "deleteForward" && actionType !== "deleteBackward") {
        return { elementState, data };
      }

      const [prefix, selection, suffix] = slice(elementState);
      const remainder = selection.replace(/[^ -]/g, "");
      const value = (prefix + remainder + suffix).replace(/[ -]*$/g, "");
      let caretPos = actionType === "deleteForward" ? remainder.length : 0;
      caretPos = Math.min(elementState.selection[0] + caretPos, value.length);

      return {
        elementState: { value, selection: [caretPos, caretPos] },
        data,
      };
    },

    ({ elementState, data }) => ({ elementState, data: data.toUpperCase() }),
  ],
};

export default birthCertificateMask;
