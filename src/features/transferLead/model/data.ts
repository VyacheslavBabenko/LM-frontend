import { ISelectorListItemSimple } from "shared/helpers/types";
import { v4 as uuidv4 } from "uuid";

export const getNoneSelectItem = (
	name: string
): ISelectorListItemSimple<number> => ({
	value: NaN,
	renderElement: name,
	key: "NaN",
	active: true,
});

export const formatUsersToFinder = (
	data: any,
	activeId = NaN
): ISelectorListItemSimple<number>[] => {
	const list = data.map((v) => ({
		value: v._id,
		renderElement: `${v.firstName} ${v.lastName}`,
		key: `${v._id}${uuidv4()}`,
		active: v._id === activeId,
	}));

	return list;
};

export const countryItems: ISelectorListItemSimple<string>[] = [
	{ value: "ru", key: "Russia", renderElement: "Russia", active: false },
	{ value: "th", key: "Thailand", renderElement: "Thailand", active: false },
	{ value: "uae", key: "UAE", renderElement: "UAE", active: false },
];
