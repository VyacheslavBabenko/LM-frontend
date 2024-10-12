import { shallowEqual } from "react-redux";
import block from "bem-cn";

import { useItems, useMainItem } from "./data";
import SideMenuBlock from "./SideMenuBlock/SideMenuBlock";
import SideMenuItem from "./SideMenuBlock/SideMenuItem";

import "./SideMenu.scss";
import { useAppSelector } from "shared/hooks/useAppSelector";

const b = block("side-menu-desktop");

const SideMenu = () => {
	const open = useAppSelector(
		(state) => state.app.sideMenuOpened,
		shallowEqual
	);

	const mainItem = useMainItem();
	const blocks = useItems().map(({ title, items }) => (
		<SideMenuBlock title={title} items={items} key={title} />
	));

	return (
		<div className={b({ open })}>
			<div className={b("item")}>
				<SideMenuItem item={mainItem} />
			</div>
			{blocks}
		</div>
	);
};

export default SideMenu;
