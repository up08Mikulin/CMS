import { data } from "../script.js";
import { createItemRow } from "./createElements.js";
const itemList = document.querySelector(".tbody");
const renderItems = () => {
	data.forEach(item => {
		itemList.append(createItemRow(item));
	});
};

export {renderItems};