import queryStringToJSON from "./functions/queryStringToJSON";
import getFormValues from "./functions/getFormValues";
import setFormValues from "./functions/setFormValues";
import { HTMLInputField } from "./types/HTMLInputField";
import { numberOfInstallments } from "./types/numberOfInstallments";
import IMask from "imask";
import appendChild from "./functions/appendChild";
import formatCurrency from "./functions/formatCurrency";

const page = document.querySelector(".page-pay") as HTMLElement;


if (page) {

  const form = page.querySelector("form") as HTMLFormElement;
  const nome = page.querySelector("#nome") as HTMLInputElement;
  const number = page.querySelector("#number") as HTMLInputField;
  const validate = page.querySelector("#validate") as HTMLInputField;
  const code = page.querySelector("#code") as HTMLInputField;

  const parcelasEL = page.querySelector("#parcelas") as HTMLElement;

  const year = new Date().getFullYear();

  setFormValues(form, queryStringToJSON());

  nome.addEventListener("keyup", (e) => {
    nome.value = nome.value.toUpperCase();;
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


  const valorTotal = 100;
  const maxInstallments = 10;

  parcelasEL.innerHTML = "";


  for (let parcela = 1; parcela <= maxInstallments; parcela++) {

    const option = document.createElement("option");
    option.value = String(parcela);
    option.innerText = `
      ${parcela} parcela${parcela > 1 ? 's' : ''} de ${formatCurrency(valorTotal / parcela)}
      `;
    parcelasEL.appendChild(option);
  }



  const footer = document.querySelector<HTMLElement>("#send-pay");

  if (footer) {

    footer.addEventListener("click", e => {

      console.log("Clique no botão COMFIRMAR PAGAMENTO")

    });
  }

}

