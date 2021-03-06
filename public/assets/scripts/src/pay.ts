import queryStringToJSON from "./functions/queryStringToJSON";
import setFormValues from "./functions/setFormValues";
import { HTMLInputField } from "./types/HTMLInputField";
import { cartaoBanco } from "./types/cartaoBanco";
import IMask from "imask";
import formatCurrency from "./functions/formatCurrency";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { format } from "date-fns";
import { Ingredient } from "./types/ingredient";
import { getAuth } from "firebase/auth";

let db = getFirestore();
const hoje = new Date();
const auth = getAuth();

const page = document.querySelector(".page-pay") as HTMLElement;

if (page) {
  const form = page.querySelector("form") as HTMLFormElement;
  const nome = page.querySelector("#nome") as HTMLInputElement;
  const number = page.querySelector("#number") as HTMLInputField;
  const validate = page.querySelector("#validate") as HTMLInputField;
  const code = page.querySelector("#code") as HTMLInputField;

  const parcelasEL = page.querySelector("#parcelas") as HTMLElement;
  const bancoEL = page.querySelector("#banco") as HTMLElement;

  const year = new Date().getFullYear();

  setFormValues(form, queryStringToJSON());

  nome.addEventListener("keyup", (e) => {
    nome.value = nome.value.toUpperCase();
  });

  IMask(number, {
    mask: "0000 0000 0000 0000",
  });

  IMask(code, {
    mask: "000[0]",
  });

  IMask(validate, {
    mask: "MM/YY",
    blocks: {
      YY: {
        mask: IMask.MaskedRange,
        from: year.toString().substring(2, 4),
        to: (year + 10).toString().substring(2, 4),
      },
      MM: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
      },
    },
  });

  //captura a URL atual--- copiar o valor do pedido
  //const order = JSON.parse(sessionStorage.getItem("order")) || [];
  const queryString = location.search;

  //capturar valor da URL - pay.html?price=22
  console.log(queryStringToJSON());

  const cartaoBanco: cartaoBanco[] = [
    {
      name: "MasterCard",
      value: "MasterCard",
    },
    {
      name: "Visa",
      value: "Visa",
    },
    {
      name: "Nubank",
      value: "Nubank",
    },
    {
      name: "Elo",
      value: "Elo",
    },
  ];

  bancoEL.innerHTML = "";

  cartaoBanco.forEach((item) => {
    const option = document.createElement("option");
    option.value = String(item.value);
    (option.innerText = `
        ${item.value}
        `),
      bancoEL.appendChild(option);
  });

  //Obtem os dados do localStorage
  const getLocalStorage = (): Ingredient[][] => {
    try {
      const localAllOders = JSON.parse(
        localStorage.getItem("allOrders") as string
      );
      if (!localAllOders) {
        location.href = "index.html";
      }
      return localAllOders as Ingredient[][];
    } catch (err) {
      console.error(err);
      return [] as Ingredient[][];
    }
  };
  //Calcula o valor total
  const currentTray = getLocalStorage();
  let totalTray = 0;
  // let listInredients: Ingredient[] = [];
  currentTray.forEach((hamburger) => {
    const totalHamburger = hamburger
      .map((ingredient) => ingredient.price)
      .reduce((a, b) => a + b, 0);
    totalTray += totalHamburger;
  });

  const valorTotal = Number(totalTray);
  const maxInstallments = 6;

  parcelasEL.innerHTML = "";

  for (let parcela = 1; parcela <= maxInstallments; parcela++) {
    const option = document.createElement("option");
    let totalPorParcela = Number();
    let porcentagePorParcela = Number();
    option.value = String(parcela);
    totalPorParcela = valorTotal / parcela;
    porcentagePorParcela = totalPorParcela + parcela * 0.44;
    parcela > 2 ? valorTotal * 2 : "";

    option.innerText = `
      ${parcela} parcela${parcela > 1 ? "s" : ""} 
      de ${parcela >= 2
        ? formatCurrency(porcentagePorParcela)
        : formatCurrency(totalPorParcela)
      } 
      
      ${parcela > 1 ? " TOTAL " : "?? vista"} 

      ${parcela >= 2 ? formatCurrency(porcentagePorParcela * parcela) : ""}
  `;
    parcelasEL.appendChild(option);
  }

  const footer = document.querySelector<HTMLElement>("#send-pay");

  const modalWait = document.querySelector("#wait") as HTMLDivElement;
  const modalWaitText = document.querySelector("#wait p") as HTMLParagraphElement;
  const closeModal = modalWait.querySelector("button") as HTMLButtonElement

  if (footer) {
    footer.addEventListener("click", (e) => {

      if((nome.value || number.value || validate.value || code.value) !== "") {
        // console.log("Clique no bot??o COMFIRMAR PAGAMENTO");

        var arrayToString = JSON.stringify(Object.assign({}, currentTray));
        
  
        (async () => {
          try {
            // Add a new document with a generated id.
            const docRef = await addDoc(collection(db, "orders"), {
              date: format(hoje, "yyyy-MM-dd"),
              quantity: currentTray.length,
              price: valorTotal,
              uid: auth.currentUser?.uid,
              hamburgers: arrayToString,
            });

            modalWait?.classList.add("flex");
            modalWaitText.innerText = "Processando o pagamento... Por favor, aguarde."

            console.log("Document written with ID: ", docRef.id);

            const orderRef = doc(db, "orders", docRef.id);

            setDoc(orderRef, { orderId: docRef.id }, { merge: true });

            localStorage.clear();
            // Envia para p??gina de orders
            setTimeout(() => {
              location.href = "./orders.html"
          }, 2000);
          } catch (e) {
            // Deal with the fact the chain failed
            console.error(e);
          }
        })();
      } else {
        modalWait?.classList.add("flex");

        modalWaitText.innerText = "Preencha corretamente todos os campos";

        closeModal.addEventListener("click", () => {
          modalWait.classList.remove("flex")
        })
      }

    });
  }

  

}
