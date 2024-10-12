import React, { useMemo } from "react";
import ReactDOM from "react-dom";

import Notification from "./Notification";

import "./Notify.scss";
import { useAppSelector } from "shared/hooks/useAppSelector";

const Notify = () => {
	const { notifications } = useAppSelector((state) => state.notify);

	const items = useMemo(
		() =>
			notifications.map((item) => (
				<Notification
					key={`${item.id}`}
					text={item.text}
					type={item.type}
					id={item.id}
					needClose={item.needClose}
				/>
			)),
		[notifications]
	);

	const portalTarget = useMemo(
		() => document.getElementById("notify-root"),
		[]
	);
	if (portalTarget) return ReactDOM.createPortal(items, portalTarget);
	return null;
};

export default Notify;
