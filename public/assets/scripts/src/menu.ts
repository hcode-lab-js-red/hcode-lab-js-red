import formatCurrency from "./functions/formatCurrency";
import { Ingredient } from "./types/ingredient";
import {
  getFirestore,
  onSnapshot,
  collection,
  Firestore,
  setDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { breadOptionType } from "./types/breadOptions";

const page = document.querySelector("#menu") as HTMLElement;
const formCreateHamburger = document.querySelector(
  "#create-hamburger"
) as HTMLFormElement;
const breadOptions = document.querySelector("#breads ul") as HTMLDivElement;
const ingredients = document.querySelector("#ingredients ul") as HTMLDivElement;

let breads: breadOptionType[] = [];
let breadIngredients: breadOptionType[] = [];
const db = getFirestore();

if (page) {
  // listar pães
  const renderBreads = () => {
    breads.forEach((bread) => {
      const breadEl = document.createElement("li") as HTMLLIElement;

      breadEl.innerHTML = `
                <label>
                    <input type="radio" name="item" value="${
                      bread.id
                    }" data-ingredients/>
                    <span></span>
                    <h3>${bread.name}</h3>
                    <div>${formatCurrency(bread.price)}</div>
                </label>
                `;

      const breadGroup = breadEl.querySelector(
        "[name=item]"
      ) as HTMLInputElement;
      const itemStringfy = JSON.stringify(bread);
      breadGroup.dataset.ingredients = itemStringfy;

      listBreads.appendChild(breadEl);
    });
  };

  const listBreads = page.querySelector("#breads ul") as HTMLLIElement;
  listBreads.innerHTML = "";
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

  //listar ingredients

  const listIngredients = page.querySelector(
    "#ingredients ul"
  ) as HTMLLIElement;
  listIngredients.innerHTML = "";

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

  const renderIngredients = () => {
    breadIngredients.forEach((ingredient) => {
      const ingredienteEl = document.createElement("li") as HTMLLIElement;

      ingredienteEl.innerHTML = `
            <label>
                <input type="checkbox" name="item" value="${
                  ingredient.id
                }" data-ingredients />
                <span></span>
                <h3>${ingredient.name}</h3>
                <div>${formatCurrency(ingredient.price)}</div>
            </label>
            `;

      const ingredientsGroup = ingredienteEl.querySelector(
        "[name=item]"
      ) as HTMLInputElement;

      const itemStringfy = JSON.stringify(ingredient);
      ingredientsGroup.dataset.ingredients = itemStringfy;

      listIngredients.appendChild(ingredienteEl);
    });
  };

  renderBreads();
  renderIngredients();

  const aside = document.querySelector("aside") as HTMLElement;

  const orderElList = aside.querySelector("ul#orderList") as HTMLUListElement;
  orderElList.innerHTML = "";

  const tray = aside.querySelector("header small") as HTMLElement;
  tray.innerText = "esta vazia.";

  //lista bandeja
  const renderTray = () => {
    let currentTray = getLocalStorange();
    let totalTray = 0;

    orderElList.innerHTML = "";

    currentTray.forEach((hamburger, index) => {
      tray.innerText = `${index + 1} Hamburguers`;

      const hamburgerEl = document.createElement("li");

      const totalHamburger = hamburger
        .map((ingredient) => ingredient.price)
        .reduce((a, b) => a + b, 0);

      totalTray += totalHamburger;

      hamburgerEl.innerHTML = `

                <div>Hamburguer ${index + 1}</div>
                <div> ${formatCurrency(totalHamburger)}</div>
                <button type="button" aria-label="Remover Hamburguer 1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z" fill="black"/>
                    </svg>
                </button>
                
            `;

      orderElList.appendChild(hamburgerEl);
    });

    const totalEl = document.querySelector("#total-tray") as HTMLSpanElement;

    totalEl.innerText = formatCurrency(totalTray);
  };

  const getLocalStorange = (): Ingredient[][] => {
    try {
      const localAllOders = JSON.parse(
        localStorage.getItem("allOrders") as string
      );
      if (!localAllOders) {
        return [] as Ingredient[][];
      }
      return localAllOders as Ingredient[][];
    } catch (err) {
      console.error(err);
      return [] as Ingredient[][];
    }
  };

  const saveOrder = document.querySelector(
    "#save-hamburger"
  ) as HTMLButtonElement;

  saveOrder?.addEventListener("click", () => {
    (async () => {
      try {
        // Add a new document with a generated id.
        const docRef = await addDoc(collection(db, "tray"), {
          //adicionar objeto
        });
        const orderRef = doc(db, "tray", docRef.id);
        setDoc(orderRef, { orderId: docRef.id }, { merge: true });
      } catch (e) {
        // Deal with the fact the chain failed
        console.error(e);
      }
    })();

    const allEls = page.querySelectorAll("[name=item]") as NodeList;

    // sendLocalStorange();
    const hamburger: Ingredient[] = [];
    const currentTray = getLocalStorange();

    allEls.forEach((el) => {
      const elSelect = el as HTMLInputElement;

      if (elSelect.checked) {
        const jsonIngredient: Ingredient = JSON.parse(
          elSelect.dataset.ingredients as string
        );
        hamburger.push(jsonIngredient);
      }
    });

    currentTray.push(hamburger); //coloca na bandeja
    const currentTrayFiltered = currentTray.filter((hamburger) => {
      return hamburger.length > 1;
    });

    localStorage.setItem("allOrders", JSON.stringify(currentTrayFiltered));

    formCreateHamburger.reset();

    renderTray();

    // manda para pagina de pagamento
    const pay = document.querySelector("#payment");

    if (pay) {
      pay.addEventListener("click", () => {
        location.href = "pay.html";
      });
    }
  });
}
