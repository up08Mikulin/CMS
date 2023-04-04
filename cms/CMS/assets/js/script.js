"use strict";
import {getStorage} from "../js/modules/serviceStorage.js";
import {renderItems} from "../js/modules/render.js";
import {popupControl, formControl, deleteFunction, editItemsFunction} from "../js/modules/control.js";

let data = [];

let addProductBtn = document.querySelector(".add-product-btn");
let popup = document.querySelector(".pop-up");
let closeBtn = document.querySelector(".pop-up__close");
const form = document.querySelector(".pop-up__main");
const size = 1000000; //bites
const addImg = document.querySelector(".add-img");


addImg.addEventListener("change", ()=> {
	let file = addImg.files[0];
	if (file.size >= size) {
		alert("Размер файла не должен составлять больше 1 Мб")
	} else {
	}
	console.log(file)
})

const init = () => {
	getStorage();
	popupControl(addProductBtn, closeBtn, popup);
	renderItems();
	formControl(form, data);
	deleteFunction();
	editItemsFunction();
}

init();

export {data, popup}








