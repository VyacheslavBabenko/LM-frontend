import React, { useState } from "react";
import block from "bem-cn";

import arrowSVG from "../../img/arrow.svg";

import TableBodyCell from "../TableBodyCell/TableBodyCell";
import { TTableBody } from "../types";

import "./TableBody.scss";
import TableInner from "../TableInner";
import SVG from "../../../SVG";

const b = block("table-body-dekstop");

function TableBody<T, I = null>(props: TTableBody<T, I>) {
	const {
		config,
		data,
		withTotal,
		configInner,
		dataInner,
		mapFnInner,
		callback,
	} = props;

	const [indexOpened, setOpened] = useState<boolean | number>(false);

	return (
		<tbody className={b({ withTotal })}>
			{data.map((item, index) => {
				const handleSubmitInnerData = () => {
					if (index === indexOpened) {
						setOpened(false);
					} else {
						setOpened(index);

						if (callback) callback(item);
					}
				};

				const arrowComponent =
					dataInner && !item.data.withoutCallback ? (
						<SVG
							onClick={handleSubmitInnerData}
							className={b("arrow", { opened: indexOpened === index })}
							svgProps={{ src: arrowSVG }}
						/>
					) : undefined;

				return (
					<>
						<tr key={item.id} className={b("row")}>
							{config.map((col) => (
								<TableBodyCell
									callback={callback}
									key={col.key}
									data={item.data}
									config={col}
									element={arrowComponent}
								/>
							))}
						</tr>

						{dataInner &&
							mapFnInner &&
							configInner &&
							indexOpened === index && (
								<tr>
									<td colSpan={config.length}>
										<div className={b("table-inner")}>
											<TableInner
												data={dataInner}
												mapFn={mapFnInner}
												config={configInner}
												withTotal
											/>
										</div>
									</td>
								</tr>
							)}
					</>
				);
			})}
		</tbody>
	);
}

export default TableBody;
