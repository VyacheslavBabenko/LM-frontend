import { useCallback, useMemo, useState } from "react";
import { shallowEqual } from "react-redux";
import block from "bem-cn";

import SVG from "components/SVG";

import { useAppDispatch, useAppSelector } from "shared/hooks/useAppSelector";
import arrowSVG from "shared/img/arrow.svg";
import { languagesWithIcons } from "shared/locale";

import langSVG from "./img/lang.svg";

import "./LanguageDropdownSelectorFull.scss";
import { ILangCodes } from "shared/locale/types";
import { changeLang } from "store/locale/localeSlice";

const b = block("language-dropdown-selector-full-desktop");

const LanguageDropdownSelectorFull = () => {
	const dispatch = useAppDispatch();
	const lang = useAppSelector((state) => state.locale.lang);
	const locale = useAppSelector((state) => state.locale.common, shallowEqual);

	const changeLangHandler = useCallback(
		(newLang: ILangCodes) => {
			dispatch(changeLang(newLang));
		},
		[dispatch]
	);

	const [isOpen, changeOpen] = useState(false);

	const items = useMemo(
		() =>
			Object.values(languagesWithIcons).map((item) => {
				const isSelected = lang === item.lang;
				return (
					<div
						className={b("item", { selected: isSelected })}
						onClick={() => changeLangHandler(item.lang)}
						key={item.lang}
					>
						<img className={b("item-img")} src={item.icon} alt={item.text} />
						<span className={b("item-text")}>{item.text}</span>
					</div>
				);
			}),
		[changeLangHandler, lang]
	);

	return (
		<div className={b({ open: isOpen })} onClick={() => changeOpen(!isOpen)}>
			<div className={b("current")}>
				<SVG className={b("current-item-lang")} svgProps={{ src: langSVG }} />
				<span
					className={b("current-name")}
				>{`${locale.language}: ${languagesWithIcons[lang]?.text}`}</span>
				<SVG className={b("current-item-arrow")} svgProps={{ src: arrowSVG }} />
			</div>
			{isOpen ? (
				<div className={b("items")} onMouseLeave={() => changeOpen(false)}>
					{items}
				</div>
			) : null}
		</div>
	);
};

export default LanguageDropdownSelectorFull;
