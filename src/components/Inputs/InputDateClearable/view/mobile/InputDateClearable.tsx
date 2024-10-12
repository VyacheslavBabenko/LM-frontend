import React, { forwardRef } from "react";
import DatePicker from "react-datepicker";
import block from "bem-cn";

import SVG from "components/SVG";

import { formateDate } from "shared/helpers";

import crossSVG from "../img/cross.svg";
import { IInnerComponentProps, IInputDateClearableProps } from "./types";

import "react-datepicker/dist/react-datepicker.css";
import "./InputDateClearable.scss";

const b = block("input-date-clearable-mobile");

const InputDateClearable = ({
	dateFormat,
	selected,
	isValid,
	onChange,
	color,
}: IInputDateClearableProps) => {
	const ExampleCustomInput = forwardRef(
		({ value, onClick }: IInnerComponentProps, ref) => (
			<div
				className={b("custom-date-input")}
				onClick={onClick}
				ref={ref as React.LegacyRef<HTMLDivElement>}
			>
				<span className={b("custom-date-input-value")}>
					{formateDate(value)}
				</span>
				<SVG
					className={b("custom-date-input-cross")}
					svgProps={{ src: crossSVG }}
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
				isClearable
			/>
		</div>
	);
};

export default InputDateClearable;
