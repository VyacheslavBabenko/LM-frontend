import React from "react";
import block from "bem-cn";
import { Link, useLocation } from "react-router-dom";

import SVG from "components/SVG";

import { ISideMenuItemProps } from "./types";
import "./SideMenuItem.scss";
import checkOnActivity from "shared/helpers/checkOnActivity";
import { useAppSelector } from "shared/hooks/useAppSelector";

const b = block("side-menu-item-desktop");

const SideMenuItem = ({ item }: ISideMenuItemProps) => {
	const location = useLocation();
	const active = checkOnActivity(item, location);
	const open = useAppSelector((state) => state.app.sideMenuOpened);

	return (
		<Link className={b({ open, active })} to={item.to}>
			<SVG
				className={b("icon")}
				svgProps={{ src: active ? item.svgActive : item.svg }}
			/>
			{open && item.text}
		</Link>
	);
};

export default SideMenuItem;
