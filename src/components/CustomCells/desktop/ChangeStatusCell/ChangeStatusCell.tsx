import React from "react";
import block from "bem-cn";

import SVG from "components/SVG";

import editSVG from "shared/img/edit.svg";

import "./ChangeStatusCell.scss";
import { TUser } from "store/auth/authThunks";
import { useAppDispatch } from "store/store";
import { changeStatusModal } from "store/leads/receivedLeads/receivedLeads";

const b = block("manage-cell");

const ChangeStatusCell = (props: { id: string }) => {
	const { id } = props;
	const dispatch = useAppDispatch();

	return (
		<div onClick={() => dispatch(changeStatusModal(id))} className={b()}>
			<SVG className={b("icon")} svgProps={{ src: editSVG }} />
		</div>
	);
};

export default ChangeStatusCell;
