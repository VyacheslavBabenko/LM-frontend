import React, { useMemo } from "react";
import block from "bem-cn";

import { useAppSelector } from "shared/hooks/useAppSelector";

import { getKey } from "../../../data";
import { TTableBodyCell } from "../types";

import "./TableInnerBodyCell.scss";

const b = block("table-body-cell-inner");

function TableInnerBodyCell<T>(props: TTableBodyCell<T>) {
	const { config, data } = props;
	const locale = useAppSelector((state) => state.locale.common);

	const value = useMemo(() => {
		const keyValue = getKey(data, config.key);

		return config.withBodyLocalization
			? locale[keyValue as keyof typeof locale]?.toString()
			: keyValue;
	}, [data, config.key]);

	return (
		<td className={b()}>
			{config?.renderBody ? config.renderBody(data) : value}
		</td>
	);
}

export default TableInnerBodyCell;
