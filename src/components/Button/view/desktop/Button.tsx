import { useCallback } from "react";
import { Link } from "react-router-dom";
import block from "bem-cn";

import { IButtonProps } from "./types";

import "./Button.scss";

const b = block("button-desktop");

const Button = ({
	children,
	disabled = false,
	color = "default",
	borderRadius = 5,
	type = "button",
	size = "default",
	link,
	onClick,
}: IButtonProps) => {
	const handleClick = useCallback(
		(e) => {
			if (disabled) {
				e.preventDefault();
			} else if (onClick) {
				onClick(e);
			}
		},
		[disabled, onClick]
	);

	return link ? (
		<Link
			className={b({ disabled, color, borderRadius, size })}
			to={link}
			onClick={handleClick}
		>
			{children}
		</Link>
	) : (
		<button
			type={type}
			className={b({ disabled, color, borderRadius, size })}
			onClick={handleClick}
		>
			{children}
		</button>
	);
};

export default Button;
