import appendChild from "./functions/appendChild";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { breadOptionType } from "./types/breadOption";
import formatCurrency from "./functions/formatCurrency";

const breadOptions = document.querySelector("#breads") as HTMLDivElement;
const ingredients = document.querySelector("#ingredients") as HTMLDivElement;
const bottom = document.querySelector("#btnSaveBurguer") as HTMLButtonElement;
let breads: breadOptionType[] = [];
let breadIngredients: breadOptionType[] = [];
const db = getFirestore();

const renderBreads = () => {
  breads.forEach((item) => {
    item.priceFormated = formatCurrency(item.price);
    appendChild(
      "li",
      `
      <label>
        <input type="radio" name="item" value="${item.id}" />
        <span></span>
        <h3>${item.name}</h3>
        <div>${item.priceFormated}</div>
      </label>
      `,
      breadOptions
    );
  });
};
const renderIngredients = () => {
  breadIngredients.forEach((item) => {
    item.priceFormated = formatCurrency(item.price);
    appendChild(
      "li",
      `
      <label>
        <input type="checkbox" name="item" value="${item.id}"/>
        <span></span>
        <h3>${item.name}</h3>
        <div>${item.priceFormated}</div>
      </label>
      `,
      ingredients
    );
    // sessionStorage.setItem("ingredients", JSON.stringify(breadIngredients));
  });
};

if (breadOptions) {
  breadOptions.innerHTML = "";
  onSnapshot(collection(db, "breadOptions"), (collection) => {
    breads = [];
    collection.forEach((el) => {
      breads.push(el.data() as breadOptionType);
    });
    renderBreads();
  });
}
if (ingredients) {
  ingredients.innerHTML = "";
  onSnapshot(collection(db, "ingredientsOptions"), (collection) => {
    breadIngredients = [];
    collection.forEach((el) => {
      breadIngredients.push(el.data() as breadOptionType);
    });
    renderIngredients();
  });
}
