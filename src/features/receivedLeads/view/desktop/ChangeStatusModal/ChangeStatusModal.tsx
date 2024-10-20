import React, { useCallback, useEffect, useMemo, useState } from "react";

import block from "bem-cn";

import Button from "components/Button/desktop";
import Modal from "components/Modal/desktop";

import "./ChangeStatusModal.scss";
import { useAppDispatch, useAppSelector } from "shared/hooks/useAppSelector";
import {
	changeLeadStatus,
	changeStatusModal,
} from "store/leads/receivedLeads/receivedLeads";
import SelectFinder from "components/Selectors/SelectFinder/desktop";
import { getNoneSelectItem } from "features/transferLead/model/data";
import { useLeadStatusItems } from "features/transferredLeads/model/data";

const b = block("change-status-modal");
export const ChangeStatusModal = () => {
	const locale = useAppSelector((state) => state.locale.common);
	const leadStatusItems = useLeadStatusItems();
	const { isOpen, id } = useAppSelector(
		(state) => state.receivedLeads.modal.statusModal
	);
	const dispatch = useAppDispatch();

	const notChosenItem = useMemo(
		() => getNoneSelectItem(locale.notChosen),
		[locale]
	);
	const [statuses, setStatuses] = useState([notChosenItem, ...leadStatusItems]);

	const statusActive = statuses.find((el) => el.active)?.key !== "NaN";

	useEffect(() => {
		setStatuses([notChosenItem, ...leadStatusItems]);
	}, [locale]);

	const onChangeStatus = (value: typeof statuses) => {
		setStatuses([...value]);
	};

	const sendStatus = () => {
		const statusActive = statuses.find((el) => el.active)?.value;

		if (statusActive && id) {
			dispatch(changeStatusModal(null));
			dispatch(changeLeadStatus({ id, status: statusActive }));
			setStatuses([notChosenItem, ...leadStatusItems]);
		}
	};

	if (isOpen) {
		return (
			<Modal onClose={() => dispatch(changeStatusModal(null))}>
				<div className={b("modal")}>
					<h5 className={b("modal-title")}>{locale.changeStatus}</h5>

					<div className={b("item")}>
						<div className={b("item-name")}>{locale.status}</div>
						<div className={b("item-field")}>
							<SelectFinder items={statuses} onChange={onChangeStatus} />
						</div>
					</div>

					<div className={b("modal-buttons")}>
						<div className={b("modal-button")}>
							<Button
								color="hollow-blue"
								onClick={sendStatus}
								disabled={!statusActive}
							>
								{locale.done}
							</Button>
						</div>
					</div>
				</div>
			</Modal>
		);
	}
	return null;
};

export default ChangeStatusModal;
