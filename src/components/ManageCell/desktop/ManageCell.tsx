import React from "react";
import { Link } from "react-router-dom";
import block from "bem-cn";

import SVG from "components/SVG";

import editSVG from "shared/img/edit.svg";

import { TManageCell } from "../types";

import "./ManageCell.scss";

const b = block("manage-cell");

const ManageCell = (props: TManageCell) => {
	const { link } = props;

	return (
		<Link className={b()} to={link}>
			<SVG className={b("icon")} svgProps={{ src: editSVG }} />
		</Link>
	);
};

export default ManageCell;
