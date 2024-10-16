import React, { FC } from "react";
import { shallowEqual } from "react-redux";
import block from "bem-cn";

import FilterHeader from "components/FilterHeader/desktop";
import Input from "components/Inputs/Input/desktop";
import InputDate from "components/Inputs/InputDate/desktop";
import Select from "components/Selectors/Select/desktop";
import Toggle from "components/Toggle/view/desktop";

import "./TransferredLeadsFilters.scss";
import { useAppSelector } from "shared/hooks/useAppSelector";
import CheckBox from "components/CheckBox/desktop";
import SelectFinder from "components/Selectors/SelectFinder/desktop";

const b = block("transferred-leads-filters");

interface ITransferredLeadsFilters {
	filterState: any;
}

const TransferredLeadsFilters: FC<ITransferredLeadsFilters> = ({
	filterState,
}) => {
	const locale = useAppSelector((state) => state.locale.common, shallowEqual);

	return (
		<section className={b()}>
			<FilterHeader
				itemsOnPage={filterState.values.itemsOnPage}
				onItemsOnPageChange={filterState.onItemsOnPageChanged}
				onSubmit={filterState.onSubmit}
			>
				<div className={b("inputs")}>
					<div className={b("item")}>
						<div className={b("item-name")}>{locale.firstName}</div>
						<div className={b("item-field")}>
							<Input
								value={filterState.values.firstName || ""}
								placeholder={locale.firstName}
								type="string"
								name="firstName"
								onChange={filterState.handleChange}
							/>
						</div>
					</div>
					<div className={b("item")}>
						<div className={b("item-name")}>{locale.lastName}</div>
						<div className={b("item-field")}>
							<Input
								value={filterState.values.lastName}
								placeholder={locale.lastName}
								type="string"
								name="lastName"
								onChange={filterState.handleChange}
							/>
						</div>
					</div>
					<div className={b("item")}>
						<div className={b("item-name")}>{locale.company}</div>
						<div className={b("item-field")}>
							<SelectFinder
								items={filterState.values.company}
								onChange={filterState.onChangeCompany}
							/>
						</div>
					</div>
				
				</div>
				<div className={b("second-inputs")}>
					<div className={b("item")}>
						<div className={b("item-name")}>{locale.installment}</div>
						<div className={b("item-field")}>
							<SelectFinder
								items={filterState.values.installment}
								onChange={filterState.onChangeInstallment}
							/>
						</div>
					</div>
					<div className={b("item")}>
						<div className={b("item-name")}>{locale.status}</div>
						<div className={b("item-field")}>
							<SelectFinder
								items={filterState.values.statuses}
								onChange={filterState.onChangeStatus}
							/>
						</div>
					</div>

					<div className={b("item")}>
						<div className={b("item-name")}>{locale.country}</div>
						<div className={b("item-field")}>
							<SelectFinder
								items={filterState.values.country}
								onChange={filterState.onChangeCountry}
							/>
						</div>
					</div>

					<div className={b("item")}>
						<div className={b("item-name")}>{locale.recipient}</div>
						<div className={b("item-field")}>
							<SelectFinder
								items={filterState.values.recipient}
								onChange={filterState.onChangeRecipient}
							/>
						</div>
					</div>
				</div>
			</FilterHeader>
		</section>
	);
};

export default TransferredLeadsFilters;
