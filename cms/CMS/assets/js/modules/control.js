import { data, popup} from "../script.js";
import { createItemRow } from "./createElements.js";
import { setStorage, clearStorage } from "./serviceStorage.js";
const itemList = document.querySelector(".tbody");

const popupControl = (addProductBtn, closeBtn, popup) => {
	const name = document.querySelector(".textarea-name");
	const category = document.querySelector(".textarea-category");
	const units = document.querySelector(".textarea-units");
	const discount = document.querySelector(".textarea-discount");
	const description = document.querySelector(".textarea-description");
	const amount = document.querySelector(".textarea-amount");
	const price = document.querySelector(".textarea-price");
	const footerSum = document.querySelector(".footer-sum");
	const checkbox = document.querySelector(".checkbox");
	addProductBtn.addEventListener('click', e => {
		popup.classList.add("active");
		e.stopPropagation();
	});
	closeBtn.addEventListener('click', ()=> {
		name.value = "";
		category.value = "";
		units.value = "";
		discount.value = "";
		description.value = "";
		amount.value = "";
		price.value = "";
		footerSum.value = "";
		checkbox.checked = false;
		popupClose();		
	});
	document.onclick = function(e){
		if(!e.target.closest(".pop-up")) {
			name.value = "";
			category.value = "";
			units.value = "";
			discount.value = "";
			description.value = "";
			amount.value = "";
			price.value = "";
			footerSum.value = "";
			checkbox.checked = false;
			popupClose();
		};
	};
};

const popupClose = () => {
	const popup = document.querySelector(".pop-up")
	popup.classList.remove("active");
};

const increment = () => {
	return data.length + 1;
};

const formControl = (form, data) => {
	const discount = document.querySelector(".textarea-discount");
	const amount = document.querySelector(".textarea-amount");
	const price = document.querySelector(".textarea-price");
	const footerSum = document.querySelector(".footer-sum");
	const checkbox = document.querySelector(".checkbox");
	
	discount.addEventListener("input", () => {
		if (discount.value.length > 0 && discount.value != 0) {
			checkbox.checked = true;
		} else {
			checkbox.checked = false;
		}
	});
	if (checkbox.checked == true) {
		discount.removeAttribute("disabled")
	}
	checkbox.addEventListener("change", ()=> {
		if (checkbox.checked == true) {
			footerSum.innerHTML = (+(price.value) - (discount.value * (1 / 100) * price.value)) * +(amount.value);
			discount.removeAttribute("disabled")
		} else {
			footerSum.innerHTML = amount.value * price.value;
			discount.setAttribute("disabled", true)
			};
	});
	amount.addEventListener("input", ()=> {
		if (document.querySelector(".checkbox").checked) {
			footerSum.innerHTML = (+(price.value) - (discount.value * (1 / 100) * price.value)) * +(amount.value);
		} else {
			footerSum.innerHTML = amount.value * price.value;
		};
	});
	price.addEventListener("input", ()=> {
		if (document.querySelector(".checkbox").checked) {
			footerSum.innerHTML = (+(price.value) - (discount.value * (1 / 100) * price.value)) * +(amount.value);
		} else {
			footerSum.innerHTML = amount.value * price.value;
		};
	});

	form.addEventListener("submit", e => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const newItem = Object.fromEntries(formData);
		const discount = document.querySelector(".textarea-discount");
		newItem.id = increment();
		if (discount.hasAttribute("disabled")) {
			
		}
		if (document.querySelector(".checkbox").checked) {
			newItem.hasDiscount = true;
		} else {
			newItem.hasDiscount = false;
		};

		if (newItem.hasDiscount == true) {
			newItem.total = (+(newItem.price) - (discount.value * (1 / 100) * newItem.price)) * +(newItem.amount);
			newItem.price = (+(newItem.price) - (discount.value * (1 / 100) * newItem.price));
		} else {
			newItem.total = +(newItem.amount) * +(newItem.price);
		};

		data.push(newItem);
		addItem(newItem, itemList);
		setStorage();
		e.target.reset();
		popupClose();
		location.reload();
		calculateTotal();
	});
};
const calculateTotal = () => {
	let sum = document.querySelector(".sum");
	let value = 0;
	data.forEach(item => {
		value += item.total;
	});
	sum.innerHTML = value;
	return value;
}

const addItem = (item, itemList) => {
	itemList.append(createItemRow(item));
};

const deleteFunction = () => {
	const deleteIcons = document.querySelectorAll(".deleteIcon");
	deleteIcons.forEach(icon => {
		icon.addEventListener("click", (e)=> {
			e.preventDefault();
			e.stopPropagation();
			const target = e.target;
			target.parentNode.parentNode.remove();
			clearStorage(target);
			calculateTotal();
		});
	});
};

const editItemsFunction = () => {
	const editIcons = document.querySelectorAll(".editIcon");
	const submitBtn = document.querySelector(".footer__btn");
	const footerSum = document.querySelector(".footer-sum");
	const checkbox = document.querySelector(".checkbox");
	editIcons.forEach(icon => {
		icon.addEventListener("click", e => {
			const target = e.target;
			e.preventDefault();
			e.stopPropagation();
			popup.classList.add("active");
			const name = document.querySelector(".textarea-name");
			const category = document.querySelector(".textarea-category");
			const units = document.querySelector(".textarea-units");
			const discount = document.querySelector(".textarea-discount");
			const description = document.querySelector(".textarea-description");
			const amount = document.querySelector(".textarea-amount");
			const price = document.querySelector(".textarea-price");
			data.forEach(item => {
				if (+(item.id) == +(target.parentNode.parentNode.childNodes[0].textContent)) {
					if (item.hasDiscount == true) {
						checkbox.checked = true;
					};
					name.value = item.name;
					category.value = item.category;
					units.value = item.units;
					discount.value = item.discount;
					description.value = item.description;
					amount.value = item.amount;
					price.value = item.price;
					footerSum.innerHTML = item.total;
				};
				if (popup.classList.contains("active")) {
					submitBtn.addEventListener("click", ()=> {
						item.id = item.id;
						item.name = name.value;
						item.category = category.value;
						item.discount = discount.value;
						item.description = description.value;
						item.units = units.value;
						item.amount = amount.value;
						item.price = price.value;
						footerSum.innerHTML = item.total;
						data.splice(this, 1);
						location.reload();
					});
				};
				setStorage();
			});
			calculateTotal();
		});
	});
} ;

const searchItemFunction = () => {
	
}


export {popupControl, popupClose, calculateTotal, increment, formControl, addItem, deleteFunction, editItemsFunction}