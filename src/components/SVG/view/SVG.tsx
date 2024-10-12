import SVGInline from "react-inlinesvg";
import block from "bem-cn";

import { ISVGProps } from "./types";
import "./SVG.scss";

const b = block("SVG-component");

const SVG = ({ svgProps, ...restProps }: ISVGProps) => {
	return (
		<span className={b()} {...restProps}>
			<SVGInline {...svgProps} className={b("content").toString()} />
		</span>
	);
};

export default SVG;
