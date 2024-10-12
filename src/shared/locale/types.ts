import { locale } from './ru-ru';

type ILangCodes = 'ru-ru' | 'en-US';
type ILangShortCodes = 'ru' | 'en';
type ILangKeys = 'RU' | 'EN';

type ILangKeyCodePairs = {
  [k in ILangKeys]: ILangCodes;
};

type ILangCodeShortCodePairs = {
  [k in ILangCodes]: ILangShortCodes;
};

type ILangCodeDataPairs = {
  [k in ILangCodes]: { lang: ILangCodes; icon: string; text: string };
};

type ILocaleStructure = typeof locale;

export type {
  ILangCodes,
  ILangShortCodes,
  ILangKeys,
  ILangKeyCodePairs,
  ILangCodeDataPairs,
  ILangCodeShortCodePairs,
  ILocaleStructure,
};
