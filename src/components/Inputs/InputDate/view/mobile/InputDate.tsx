import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import block from "bem-cn";

import SVG from "components/SVG";

import { formateDate } from "shared/helpers";

import arrowSVG from "../img/arrow.svg";
import calendarSVG from "../img/calendar.svg";
import { IInnerComponentProps, IInputDateProps } from "./types";

import "react-datepicker/dist/react-datepicker.css";
import "./InputDate.scss";

const b = block("input-date-mobile");

const InputDate = ({
	dateFormat,
	selected,
	isValid,
	onChange,
	color,
}: IInputDateProps) => {
	const ExampleCustomInput = forwardRef(
		({ value, onClick }: IInnerComponentProps, ref) => (
			<div
				className={b("custom-date-input")}
				onClick={onClick}
				ref={ref as React.LegacyRef<HTMLDivElement>}
			>
				<SVG
					className={b("custom-date-input-calendar")}
					svgProps={{ src: calendarSVG }}
				/>
				<span className={b("custom-date-input-value")}>
					{formateDate(value)}
				</span>
				<SVG
					className={b("custom-date-input-arrow")}
					svgProps={{ src: arrowSVG }}
				/>
			</div>
		)
	);

	ExampleCustomInput.displayName = "ExampleCustomInput";

	return (
		<div className={b({ valid: isValid, color })}>
			<DatePicker
				dateFormat={dateFormat}
				selected={selected}
				onChange={onChange}
				customInput={<ExampleCustomInput />}
			/>
		</div>
	);
};

export default InputDate;
