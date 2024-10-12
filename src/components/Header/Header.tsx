import React, { useCallback } from "react";
import { shallowEqual, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import block from "bem-cn";

import LanguageDropdownSelector from "components/Language/LanguageDropdownSelector/desktop";
import SVG from "components/SVG";

import logoSVG from "shared/img/logo.svg";

import toCloseSVG from "./img/to-close.svg";
import toOpenSVG from "./img/to-open.svg";
import userSVG from "./img/user.svg";
import LogoutButton from "./LogoutButton";
import Time from "./Time";

import "./Header.scss";
import { useAppSelector } from "shared/hooks/useAppSelector";
import { toggleSideMenu } from "store/app/appSlice";

const b = block("header-desktop");

const Header = () => {
	const { sideMenuOpened } = useAppSelector((state) => state.app, shallowEqual);
	const user = useAppSelector((state) => state.auth.user, shallowEqual);
	const locale = useAppSelector((state) => state.locale.common);
	const dispatch = useDispatch();

	const handleBurgerClick = useCallback(() => {
		dispatch(toggleSideMenu());
	}, [dispatch]);

	return (
		<header className={b()}>
			<div className={b("burger-wrapper")} onClick={handleBurgerClick}>
				<SVG
					className={b("burger")}
					svgProps={{ src: sideMenuOpened ? toCloseSVG : toOpenSVG }}
				/>
			</div>
			<Link className={b("logo-link")} to="/">
				<SVG className={b("logo")} svgProps={{ src: logoSVG }} />
				{locale.leadManagement}
			</Link>
			<ul className={b("info")}>
				<li className={b("item")}>
					<div className={b("item-data")}>
						<div className={b("item-label")}>{locale.time}</div>
						<Time />
					</div>
				</li>
				<li className={b("item")}>
					<SVG className={b("item-icon")} svgProps={{ src: userSVG }} />
					<div className={b("item-data")}>
						<div className={b("item-label")}>{locale.greeting},</div>
						<div className={b("item-value")}>
							<span className={b("item-login")}>{user?.email}</span>
						</div>
					</div>
					<div className={b("logout")}>
						<LogoutButton />
					</div>
				</li>
				<li className={b("lang")}>
					<LanguageDropdownSelector />
				</li>
			</ul>
		</header>
	);
};

export default Header;
