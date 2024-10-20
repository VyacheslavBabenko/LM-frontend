// import { ETableSortDirections } from "components/Table/types";
// Тут происходит конвертация из формата значений фильтров для компонентов в формат значений для запроса на сервер.
// На разных проектах разные форматы фильтров при запросах на сервер(все вопросы к бэкерам), но формат фильтров для компонентов
// в данном случае сведен к стандартному, который совместим во всеми основными типами вьюшек(Selector, Checkbox, ...).
// При смене проекта в данной функции нужно отфильтровать/замапить/... данные из вьюшек фильтров в формат, который переваривает сервер.
export const convertFilters = (args: any): any => {
	const {
		email,
		userID,
		page,
		itemsOnPage,
		// sortTableRow,

		username,
	} = args;

	const itemsOnPage2 = itemsOnPage
		.filter((s) => s.active)
		.map((s) => s.value)[0];

	// let calculateOrder = "";
	// const findNeededSortRow = sortTableRow.find(
	// 	(el) => el.direction !== ETableSortDirections.DEFAULT
	// );

	// calculateOrder = findNeededSortRow
	// 	? findNeededSortRow.direction + findNeededSortRow.convertedKey
	// 	: "";

	let resultObj: any = {
		limit: itemsOnPage2,
		offset: page * itemsOnPage2,
	};

	// if (findNeededSortRow) {
	// 	resultObj = {
	// 		...resultObj,
	// 		order_by: calculateOrder,
	// 	};
	// }

	if (userID) {
		resultObj = {
			...resultObj,
			id: userID,
		};
	}

	if (email !== "") {
		resultObj = {
			...resultObj,
			email,
		};
	}
	if (username !== "") {
		resultObj = {
			...resultObj,
			username,
		};
	}

	return resultObj;
};
