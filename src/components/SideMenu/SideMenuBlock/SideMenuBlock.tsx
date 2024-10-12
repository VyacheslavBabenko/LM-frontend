import React, { useState } from "react";
import { shallowEqual } from "react-redux";
import block from "bem-cn";

import SVG from "components/SVG";

import arrowSVG from "shared/img/arrow.svg";

import SideMenuItem from "./SideMenuItem";
import { ISideMenuBlockProps } from "./types";

import "./SideMenuBlock.scss";
import { useAppSelector } from "shared/hooks/useAppSelector";

const b = block("side-menu-block-desktop");

const SideMenuBlock = ({ items, title }: ISideMenuBlockProps) => {
	const isFull = useAppSelector(
		(state) => state.app.sideMenuOpened,
		shallowEqual
	);
	const [isOpen, setIsOpen] = useState(true);

	const list = items.map((item) => (
		<li className={b("item")} key={item.to}>
			<SideMenuItem item={item} />
		</li>
	));

	if (!list.length) return null;

	return (
		<div className={b({ isOpen })}>
			<div className={b("header")}>
				{isFull ? (
					<h5 className={b("title")} onClick={() => setIsOpen(!isOpen)}>
						{title}
						<SVG className={b("arrow")} svgProps={{ src: arrowSVG }} />
					</h5>
				) : (
					<div className={b("line")} />
				)}
			</div>
			<ul className={b("list", { isOpen: isOpen || !isFull })}>{list}</ul>
		</div>
	);
};

export default SideMenuBlock;
