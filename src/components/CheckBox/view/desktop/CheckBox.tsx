import React from "react";
import block from "bem-cn";

import SVG from "components/SVG";

import checkSVG from "./img/check.svg";
import { ICheckBoxProps } from "./types";

import "./CheckBox.scss";

const b = block("check-box-desktop");

const CheckBox = ({
	checked,
	name,
	onChange,
	...restProps
}: ICheckBoxProps) => (
	<label className={b({ checked })}>
		{checked && <SVG className={b("check")} svgProps={{ src: checkSVG }} />}
		<input
			{...restProps}
			className={b("input")}
			name={name}
			type="checkbox"
			checked={checked}
			onChange={onChange}
		/>
	</label>
);

export default CheckBox;
