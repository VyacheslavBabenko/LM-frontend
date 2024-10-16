import React, { useMemo } from "react";
import block from "bem-cn";

import { getKey } from "../../data";
import { TTableBodyCell } from "../types";

import "./TableBodyCell.scss";
import { useAppSelector } from "shared/hooks/useAppSelector";

const b = block("table-body-cell");

function TableBodyCell<T>(props: TTableBodyCell<T>) {
	const { config, data, element } = props;
	const locale = useAppSelector((state) => state.locale.common);

	const value = useMemo(() => {
		const keyValue = getKey(data, config.key);

		return config.withBodyLocalization
			? locale[keyValue as keyof typeof locale]?.toString()
			: keyValue;
	}, [data, config.key]);

	return (
		<td className={b({ withElement: Boolean(element) })}>
			{config?.renderBody ? config.renderBody(data, element) : value}
		</td>
	);
}

export default TableBodyCell;
