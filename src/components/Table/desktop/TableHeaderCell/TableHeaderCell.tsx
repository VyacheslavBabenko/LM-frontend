import React, { useCallback, useMemo } from "react";
import block from "bem-cn";

import SVG from "components/SVG";

import { sortIcons } from "../../data";
import { ETableSortDirections } from "../../types";
import { TTableHeaderCell } from "../types";

import "./TableHeaderCell.scss";
import { useAppSelector } from "shared/hooks/useAppSelector";

const b = block("table-header-cell");

function TableHeaderCell<T>(props: TTableHeaderCell<T>) {
	const { config, sort, onChangeSort, cellWidth } = props;
	const locale = useAppSelector((state) => state.locale.common);

	const onClick = useCallback(() => {
		if (onChangeSort) onChangeSort(config.key);
	}, [config.key, onChangeSort]);

	const currentSort = useMemo(
		() => sort?.find((item) => item.key === config.key)?.direction,
		[sort]
	);

	return (
		<th className={b()} style={{ width: `${cellWidth}%`, ...config.style }}>
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
					<div className={b("border-line")} />
				</div>
			)}
		</th>
	);
}

export default TableHeaderCell;
