/* eslint-disable func-names */
import React, { useState, useMemo } from "react";
import block from "bem-cn";

import SVG from "components/SVG";

import arrowSVG from "./img/arrow.svg";

import { ISelectProps } from "./types";
import "./Select.scss";

const b = block("select-mobile");

const Select = function <TValue = string>({
	items,
	onChange,
	color = "default",
}: ISelectProps<TValue>) {
	const [isOpen, changeOpen] = useState(false);

	const itemsList = useMemo(
		() =>
			items.map((item) => (
				<li
					key={item.key}
					className={b("item", { active: item.active })}
					onClick={() => {
						const changedList = items.map((item2) => ({
							...item2,
							active: item2.key === item.key,
						}));
						const checkHasActive = changedList.filter((item2) => item2.active);
						if (checkHasActive.length === 0) changedList[0].active = true;
						onChange(changedList);
						changeOpen(false);
					}}
				>
					{item.renderElement}
				</li>
			)),
		[items, onChange, changeOpen]
	);

	const activeItem = useMemo(
		() => items.find((item) => item.active) || items[0],
		[items]
	);

	return (
		<div
			className={b({ open: isOpen, color })}
			onClick={() => changeOpen(!isOpen)}
			onMouseLeave={() => changeOpen(false)}
		>
			<div className={b("item-selected")}>
				<div className={b("item-value-selected")}>
					{activeItem.selectedRenderElement}
				</div>
				<SVG
					className={b("item-arrow-selected")}
					svgProps={{ src: arrowSVG }}
				/>
			</div>
			{isOpen && <ul className={b("items")}>{itemsList}</ul>}
		</div>
	);
};

export default Select;
