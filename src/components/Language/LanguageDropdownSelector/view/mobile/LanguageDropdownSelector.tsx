import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import block from "bem-cn";

import SVG from "components/SVG";

import { actions as userSettingsActions } from "features/userSettings";

import { useAppSelector } from "shared/hooks";
import { languages, languagesWithIcons } from "shared/locale";

import arrowSVG from "./img/arrow.svg";

import "./LanguageDropdownSelector.scss";

const b = block("language-dropdown-selector-mobile");

const LanguageDropdownSelector = () => {
	const dispatch = useDispatch();
	const lang = useAppSelector((state) => state.userSettings.lang);

	useEffect(() => {
		// Проверка значения lang и его инициализация при необходимости
		if (!lang || !languagesWithIcons[lang]) {
			dispatch(userSettingsActions.changeLang({ lang: languages.RU }));
		}
	}, [lang, dispatch]);

	const changeLang = useCallback(
		(newLang) => {
			dispatch(userSettingsActions.changeLang({ lang: newLang }));
		},
		[dispatch]
	);

	const [isOpen, changeOpen] = useState(false);

	const items = useMemo(
		() =>
			Object.values(languagesWithIcons)
				.filter((item) => item.lang !== lang)
				.map((item) => {
					const isSelected = lang === item.lang;
					return (
						<div
							className={b("item", { selected: isSelected })}
							onClick={() => changeLang(item.lang)}
							key={item.lang}
						>
							<img className={b("item-img")} src={item.icon} alt={item.text} />
							<span className={b("item-text")}>{item.text}</span>
						</div>
					);
				}),
		[changeLang, lang]
	);

	return (
		<div className={b({ open: isOpen })} onClick={() => changeOpen(!isOpen)}>
			<div className={b("current")}>
				<img
					className={b("current-img")}
					src={languagesWithIcons[lang]?.icon}
					alt={languagesWithIcons[lang]?.text}
				/>
				<span className={b("current-name")}>
					{languagesWithIcons[lang]?.text}
				</span>
				<SVG className={b("current-item-arrow")} svgProps={{ src: arrowSVG }} />
			</div>
			{isOpen ? (
				<div
					className={b("items")} /* onMouseLeave={() => changeOpen(false)} */
				>
					{items}
				</div>
			) : null}
		</div>
	);
};

export default LanguageDropdownSelector;
