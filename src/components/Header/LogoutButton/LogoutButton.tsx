import React, { useCallback, useState } from "react";

import block from "bem-cn";

import Button from "components/Button/desktop";
import Modal from "components/Modal/desktop";
import SVG from "components/SVG";

import logOutSVG from "./img/logout.svg";

import "./LogoutButton.scss";
import { logoutUser } from "store/auth/authThunks";
import { useAppDispatch, useAppSelector } from "shared/hooks/useAppSelector";

const b = block("logout-button-desktop");

const LogoutButton = () => {
	const locale = useAppSelector((state) => state.locale.common);
	const dispatch = useAppDispatch();
	const [isOpen, setIsOpen] = useState(false);

	const handleLogOutClick = useCallback(() => {
		dispatch(logoutUser());
		setIsOpen(false);
	}, [dispatch]);

	return (
		<div className={b()}>
			{isOpen && (
				<Modal onClose={() => setIsOpen(false)}>
					<div className={b("modal")}>
						<h5 className={b("modal-title")}>{locale.areYouSureExit}</h5>
						<div className={b("modal-button")}>
							<Button color="hollow" onClick={handleLogOutClick}>
								{locale.quit}
							</Button>
						</div>
						<div className={b("modal-button")}>
							<Button onClick={() => setIsOpen(false)}>{locale.stay}</Button>
						</div>
					</div>
				</Modal>
			)}
			<div className={b("icon-wrapper")} onClick={() => setIsOpen(!isOpen)}>
				<SVG className={b("icon")} svgProps={{ src: logOutSVG }} />
			</div>
		</div>
	);
};

export default LogoutButton;
