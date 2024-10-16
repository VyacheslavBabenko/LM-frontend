import { ISelectorListItemSimple } from "shared/helpers/types";
import { v4 as uuidv4 } from "uuid";

export const formatCompaniesToFinder = (
	data: any,
	activeId = NaN
): ISelectorListItemSimple<number>[] => {
	const list = data.map((v) => ({
		value: v._id,
		renderElement: v.name,
		key: `${v._id}${uuidv4()}`,
		active: v._id === activeId,
	}));

	return list;
};