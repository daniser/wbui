export default defineI18nConfig(() => ({
  legacy: false,
  locale: "ru",
  fallbackLocale: "en",
  numberFormats: {
    en: {
      currency: {
        style: "currency",
        currency: "USD",
        notation: "standard",
      },
    },
    ru: {
      currency: {
        style: "currency",
        currency: "RUB",
        notation: "standard",
      },
    },
    uk: {
      currency: {
        style: "currency",
        currency: "UAH",
        notation: "standard",
      },
    },
  },
  datetimeFormats: {
    en: {
      time: {
        hour: "numeric",
        minute: "numeric",
      },
      dayMonth: {
        day: "numeric",
        month: "long",
      },
    },
    ru: {
      time: {
        hour: "numeric",
        minute: "numeric",
      },
      dayMonth: {
        day: "numeric",
        month: "long",
      },
    },
    uk: {
      time: {
        hour: "numeric",
        minute: "numeric",
      },
      dayMonth: {
        day: "numeric",
        month: "long",
      },
    },
  },
}));
