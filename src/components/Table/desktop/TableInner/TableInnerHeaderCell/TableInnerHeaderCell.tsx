import React, { useCallback, useMemo } from "react";
import block from "bem-cn";

import SVG from "components/SVG";

import { sortIcons } from "../data";
import { ETableSortDirections } from "../../../types";
import { TTableHeaderCell } from "../types";

import "./TableInnerHeaderCell.scss";
import { useAppSelector } from "shared/hooks/useAppSelector";

const b = block("table-header-cell-inner");

function TableInnerHeaderCell<T>(props: TTableHeaderCell<T>) {
	const { config, sort, onChangeSort } = props;
	const locale = useAppSelector((state) => state.locale.common);

	const onClick = useCallback(() => {
		if (onChangeSort) onChangeSort(config.key);
	}, [config.key, onChangeSort]);

	const currentSort = useMemo(
		() => sort?.find((item) => item.key === config.key)?.direction,
		[sort]
	);

	return (
		<th className={b()} style={config.style}>
			{config?.renderHead ? (
				config.renderHead()
			) : (
				<div onClick={onClick} className={b("container")}>
					<div className={b("text")}>
						{locale[config.localizationKey as keyof typeof locale] ??
							config.localizationKey}
					</div>
					{config.withSort && (
						<div onClick={onClick} className={b("sort")}>
							<SVG
								svgProps={{
									src: sortIcons[currentSort as ETableSortDirections],
								}}
							/>
						</div>
					)}
				</div>
			)}
		</th>
	);
}

export default TableInnerHeaderCell;
