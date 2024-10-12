import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import block from "bem-cn";
import SVG from "components/SVG";

import { NotifyModel } from "features/notify/model/NotifyModel";
import { getNotifyIcon } from "features/notify/model/utils";

import crossSVG from "../../img/cross.svg";
import { INotificationProps } from "./types";
import "./Notification.scss";
import { deleteNotify } from "store/notify/notifySlice";

const b = block("notification-desktop");

const Notification = ({ id, text, type, needClose }: INotificationProps) => {
	const dispatch = useDispatch();
	const notifyRef = useRef<HTMLDivElement>(null);
	const [isDeleted, setIsDeleted] = useState(false);

	const hideNotify = useCallback(() => {
		if (!isDeleted) {
			setIsDeleted(true);
			setTimeout(() => dispatch(deleteNotify({ id })), 600);
		}
	}, [dispatch, id, isDeleted]);

	useEffect(() => {
		if (notifyRef.current) {
			const touchListener = new NotifyModel(hideNotify, notifyRef.current);
			touchListener.init();
		}

		if (needClose) {
			const timer = setTimeout(hideNotify, 4000);
			return () => clearTimeout(timer); // Очистка таймера при размонтировании
		}
	}, [needClose, hideNotify]);

	return (
		<div className={b({ deleted: isDeleted, type })} ref={notifyRef}>
			<SVG
				className={b("icon")}
				svgProps={{ src: getNotifyIcon(type) }}
				onClick={hideNotify}
			/>
			<span className={b("text")}>{text}</span>
			<SVG
				className={b("cross")}
				svgProps={{ src: crossSVG }}
				onClick={hideNotify}
			/>
		</div>
	);
};

export default React.memo(Notification);
