/* eslint-disable max-len */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import block from "bem-cn";

import SVG from "components/SVG";

import { actions as notifyActions } from "features/notify";
import { NotifyModel } from "features/notify/model/NotifyModel";
import { getNotifyIcon } from "features/notify/model/utils";

import { ISetTimeout } from "shared/types";

import crossSVG from "../../img/cross.svg";
import { INotificationProps } from "./types";

import "./Notification.scss";

const b = block("notification-mobile");

const Notification = ({ id, text, type, needClose }: INotificationProps) => {
	const dispatch = useDispatch();

	const notifyRef = useRef<HTMLDivElement>();
	const [isDeleted, setIsDeleted] = useState(false);
	const STATIC_STATE = useRef<{
		deleted: boolean;
	}>({
		deleted: false,
	});

	const hideNotify = useCallback(() => {
		if (!isDeleted && !STATIC_STATE.current.deleted) {
			setIsDeleted(true);
			if (STATIC_STATE.current) STATIC_STATE.current.deleted = true;
			setTimeout(() => dispatch(notifyActions.deleteNotify({ id })), 600);
		}
	}, [id, isDeleted, dispatch]);

	useEffect(() => {
		if (notifyRef.current) {
			const touchListener = new NotifyModel(
				() => hideNotify(),
				notifyRef.current
			);
			touchListener.init();
		}

		let timer: ISetTimeout | undefined;
		if (needClose) {
			if (timer) clearTimeout(timer);
			timer = setTimeout(hideNotify, 4000);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			className={b({ deleted: isDeleted, type })}
			ref={notifyRef as React.LegacyRef<HTMLDivElement>}
		>
			<SVG
				className={b("icon")}
				svgProps={{ src: getNotifyIcon(type) }}
				onClick={() => hideNotify()}
			/>
			<span className={b("text")}>{text}</span>
			<SVG
				className={b("cross")}
				svgProps={{ src: crossSVG }}
				onClick={() => hideNotify()}
			/>
		</div>
	);
};

export default React.memo(Notification);

// Создаем таймер, который через 4000 мс вызывает функцию удаления нотификатора.
// При этом в функции удаления используется STATIC_STATE, изменения в котором срабатывают мгновенно,а не с задержкой как у обычный стейтов.
// Это позволяет создать защиту от множественных одновременных вызовов функции из разных источников,
// что важно, т.к. счет времени идет на милисекунды и закрытие нотификатора может исходить из нескольких параллельно существующих источников(таймер, нажатие на крест, скип в сторону).
// Удаление происходит в несколько этапов - запускается таймер на удаление, через 4000 мс меняется флажок запускающий анимацию удаления, которая длится 600 мс и
// параллельно запускается таймер с задержкой в 600 мс который вызывает диспатч в редакс на отфильтровку текущего нотификатора из списка, после чего компонент анмаунтится.
