import en from "./en";

export enum Locales {
  en = "en",
}

const dictList = {
  en,
};

export const getDict = (locale: Locales) => dictList[locale];
