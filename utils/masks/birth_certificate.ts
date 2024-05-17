import type { MaskitoOptions } from "@maskito/core";

const birthCertificateMask: MaskitoOptions = {
  mask: /^[IVXLCDM]{1,4}(-[А-ЯЁ]{0,2}( \d{0,6})?)?$/,
  preprocessors: [
    ({ elementState, data }, actionType) =>
      actionType === "insert" && /^[А-ЯЁ]$/i.test(data) && /[IVXLCDM]$/.test(elementState.value)
        ? {
            elementState: { ...elementState, value: elementState.value + "-" },
            data: "-" + data,
          }
        : { elementState, data },

    ({ elementState, data }, actionType) =>
      actionType === "insert" && /^\d$/.test(data) && /[А-ЯЁ]{2}$/.test(elementState.value)
        ? {
            elementState: { ...elementState, value: elementState.value + " " },
            data: " " + data,
          }
        : { elementState, data },

    ({ elementState, data }, actionType) =>
      actionType === "deleteBackward" && /(-[А-ЯЁ]| \d)$/.test(elementState.value)
        ? {
            elementState: {
              selection: elementState.selection.map((x) => --x) as unknown as typeof elementState.selection,
              value: elementState.value.slice(0, -1),
            },
            data,
          }
        : { elementState, data },

    ({ elementState, data }) => ({
      elementState: {
        ...elementState,
        value: elementState.value.toUpperCase(),
      },
      data: data.toUpperCase(),
    }),
  ],
};

export default birthCertificateMask;
