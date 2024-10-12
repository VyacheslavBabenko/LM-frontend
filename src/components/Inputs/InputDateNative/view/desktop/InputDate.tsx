import React, { useEffect, useState } from "react";
import block from "bem-cn";
import dayjs from "dayjs";

import SVG from "components/SVG";

import arrowSVG from "shared/img/icons/arrow.svg";

import calendarSVG from "./img/calendar.svg";
import { IInputDateNativeProps } from "./types";

import "./InputDate.scss";

const b = block("input-date-desktop");

const InputDateNative = ({
	onChange,
	value,
	format = "DD/MM/YYYY  HH:mm:ss",
	disabled = false,
	min = "",
}: IInputDateNativeProps) => {
	const [formattedValue, setFormattedValue] = useState(
		value ? dayjs(value).format(format) : format
	);

	useEffect(() => {
		setFormattedValue(value ? dayjs(value).format(format) : format);
	}, [value]);

	const handleDateChange = (e: React.FormEvent<HTMLInputElement>) => {
		setFormattedValue(dayjs(e.currentTarget.value).format(format));
		onChange(e.currentTarget.value);
	};

	return (
		<label className={b({ disabled, hasValue: Boolean(value) })}>
			<SVG className={b("icon")} svgProps={{ src: calendarSVG }} />
			<input
				type={format.includes("HH:mm") ? "datetime-local" : "date"}
				className={b("native")}
				value={value}
				step={1}
				min={min}
				onChange={handleDateChange}
				disabled={disabled}
			/>
			<div className={b("value")}>{formattedValue}</div>
			<SVG className={b("icon")} svgProps={{ src: arrowSVG }} />
		</label>
	);
};

export default InputDateNative;
