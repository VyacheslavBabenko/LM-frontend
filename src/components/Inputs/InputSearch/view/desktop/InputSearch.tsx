import React from "react";
import block from "bem-cn";

import SVG from "components/SVG";

import crossSVG from "../img/cross.svg";
import searchSvg from "./img/search.svg";
import { IInputSearchProps } from "./types";

import "./InputSearch.scss";

const b = block("input-search-desktop");

const InputSearch = ({
	color = "default",
	fontSize = 16,
	...restProps
}: IInputSearchProps) => (
	<div className={b({ color, fontSize })}>
		<SVG className={b("search")} svgProps={{ src: searchSvg }} />
		<input {...restProps} className={b("native")} type="search" />
		<span
			className={b("cross-container")}
			style={{ opacity: restProps.value ? 1 : 0 }}
		>
			<SVG className={b("cross")} svgProps={{ src: crossSVG }} />
		</span>
	</div>
);

export default InputSearch;
