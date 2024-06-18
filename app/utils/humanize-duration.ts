import humanizeDuration from "humanize-duration";

export default humanizeDuration.humanizer({
  fallbacks: ["en"],
  units: ["d", "h", "m"],
  round: true,
  delimiter: " ",
  spacer: "",
  languages: {
    en: {
      d: () => "d",
      h: () => "h",
      m: () => "m",
    },
    ru: {
      d: () => "д",
      h: () => "ч",
      m: () => "м",
    },
    uk: {
      d: () => "д",
      h: () => "год",
      m: () => "хв",
    },
  },
});
