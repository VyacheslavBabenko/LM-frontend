import React, { useState } from "react";
import block from "bem-cn";

import SVG from "components/SVG";

import crossSVG from "../img/cross.svg";
import searchSvg from "./img/search.svg";
import { IInputSearchProps } from "./types";

import "./InputSearch.scss";

const b = block("input-search-hidden-mobile");

const InputSearch = ({ children, ...restProps }: IInputSearchProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={b({ isOpen })}>
			{!isOpen && children}

			<div className={b("input")}>
				<input {...restProps} className={b("native")} type="text" />
				<div className={b("icon-wrapper")} onClick={() => setIsOpen(!isOpen)}>
					<SVG className={b("closer-icon")} svgProps={{ src: crossSVG }} />
					<SVG className={b("opener-icon")} svgProps={{ src: searchSvg }} />
				</div>
			</div>
		</div>
	);
};

export default InputSearch;
