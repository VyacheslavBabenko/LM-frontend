import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ILangCodes, ILocaleStructure } from "shared/locale/types";
import { languages, shortLanguages } from "../../shared/locale";
import { locale } from "shared/locale/ru-ru";

// Асинхронное действие для загрузки локали
export const changeLang = createAsyncThunk(
	"locale/changeLang",
	async (lang: ILangCodes) => {
		const module = await import(`shared/locale/${lang}/index.ts`);
		return { locale: module.locale, lang };
	}
);

const initialState: ILocaleStructure & { lang: ILangCodes } = {
	...locale,
	lang: languages.RU,
};

const localeSlice = createSlice({
	name: "locale",
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(
			changeLang.fulfilled,
			(
				state,
				action: PayloadAction<{ locale: ILocaleStructure; lang: ILangCodes }>
			) => {
				const { locale, lang } = action.payload;

				const htmlElement = document.querySelector("html");
				if (htmlElement) {
					htmlElement.lang = shortLanguages[lang];
				}
				// Обновляем состояние локали
				state.lang = lang;
				Object.assign(state, locale);
			}
		);
	},
});

export default localeSlice.reducer;
