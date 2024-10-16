import React, { useCallback, useEffect, useMemo, useState } from "react";
import block from "bem-cn";

import SVG from "components/SVG";

import arrowSVG from "shared/img/arrow.svg";

import { getRange } from "./data";
import { IPaginatorSwitcherProps } from "./types";

import "./PaginatorSwitcherCustom.scss";
import { useAppSelector } from "shared/hooks/useAppSelector";

const b = block("paginator-switcher-custom-desktop");

const PaginatorSwitcherCustom = ({
	pageCount,
	currentPage,
	onPageClick,
	aroundItems = 3,
	marginItems = 2,
	itemsCount,
}: IPaginatorSwitcherProps) => {
	const locale = useAppSelector((state) => state.locale.common);

	const allItems = useMemo(
		() => new Array(pageCount).fill(0).map((_, index) => index),
		[pageCount]
	);

	const [[first, last], setRange] = useState([
		0,
		marginItems + 1 + aroundItems * 2 + 1,
	]);

	useEffect(() => {
		setRange(getRange({ currentPage, pageCount, aroundItems, marginItems }));
	}, [currentPage, pageCount, aroundItems, marginItems]);

	const currentItems = useMemo(
		() =>
			allItems.slice(first, last).map((item) => (
				<div
					className={b("page-item", { active: item === currentPage })}
					onClick={() => onPageClick(item)}
					key={item}
				>
					{item + 1}
				</div>
			)),
		[first, last, allItems, currentPage, onPageClick]
	);

	const beforeItems =
		first > 0 ? (
			<>
				{new Array(marginItems).fill(0).map((_, index) => (
					<div
						className={b("page-item")}
						onClick={() => onPageClick(index)}
						key={`before_${index}`}
					>
						{index + 1}
					</div>
				))}
				<div className={b("page-item")}>...</div>
			</>
		) : null;

	const afterItems =
		last < pageCount - 1 ? (
			<>
				<div className={b("page-item")}>...</div>
				{new Array(marginItems)
					.fill(0)
					.map((_, index) => (
						<div
							className={b("page-item")}
							onClick={() => onPageClick(pageCount - index - 1)}
							key={`after${index}`}
						>
							{pageCount - index}
						</div>
					))
					.reverse()}
			</>
		) : null;

	const handleArrowClick = useCallback(
		({ direction = 1 }) => {
			if (direction === 1 && currentPage < pageCount - 1) {
				onPageClick(currentPage + direction);
			}

			if (direction === -1 && currentPage > 0) {
				onPageClick(currentPage + direction);
			}
		},
		[currentPage, pageCount, onPageClick]
	);

	return (
		<div className={b()}>
			<div className={b("paginator")}>
				<div
					className={b("arrow-left-container")}
					onClick={() => handleArrowClick({ direction: -1 })}
				>
					<SVG className={b("arrow-left")} svgProps={{ src: arrowSVG }} />
				</div>
				{beforeItems}
				{currentItems}
				{afterItems}
				<div
					className={b("arrow-right-container")}
					onClick={() => handleArrowClick({ direction: 1 })}
				>
					<SVG className={b("arrow-right")} svgProps={{ src: arrowSVG }} />
				</div>
			</div>
			{itemsCount && (
				<div
					className={b("all")}
				>{`${locale.total}: ${itemsCount} ${locale.elements}`}</div>
			)}
		</div>
	);
};

export default PaginatorSwitcherCustom;
