import EnPNG from "./img/en.png";
import RuPNG from "./img/ru.png";
import {
	ILangCodeDataPairs,
	ILangCodeShortCodePairs,
	ILangKeyCodePairs,
} from "./types";

export const languages: ILangKeyCodePairs = {
	RU: "ru-ru",
	EN: "en-US",
};

export const shortLanguages: ILangCodeShortCodePairs = {
	"ru-ru": "ru",
	"en-US": "en",
};

export const languagesWithIcons: ILangCodeDataPairs = {
	"ru-ru": { lang: languages.RU, icon: RuPNG, text: "Русский" },
	"en-US": { lang: languages.EN, icon: EnPNG, text: "English" },
};
