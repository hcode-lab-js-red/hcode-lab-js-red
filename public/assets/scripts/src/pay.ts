import queryStringToJSON from "./functions/queryStringToJSON";
import getFormValues from "./functions/getFormValues";
import setFormValues from "./functions/setFormValues";
import { HTMLInputField } from "./types/HTMLInputField";
import { numberOfInstallments } from "./types/numberOfInstallments";
import IMask from "imask";
import appendChild from "./functions/appendChild";

const page = document.querySelector(".page-pay") as HTMLElement;


if(page){

  
const form = page.querySelector("form") as HTMLFormElement;
const nome = page.querySelector("#nome") as HTMLInputElement;
const number = page.querySelector("#number") as HTMLInputField;
const validate = page.querySelector("#validate") as HTMLInputField;
const code = page.querySelector("#code") as HTMLInputField;

const parcelas = page.querySelector("#parcelas") as HTMLElement;

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

  const footer = document.querySelector<HTMLElement>("#send-pay");

  if (footer) {
  
    footer.addEventListener("click", e => {
  
      console.log("Clique no botão COMFIRMAR PAGAMENTO")
  
    });
  }
  
  //captura a URL atual--- copiar o valor do pedido
  //const order = JSON.parse(sessionStorage.getItem("order")) || [];
  const queryString = location.search;
  
  //capturar valor da URL - pay.html?price=22
  console.log(queryStringToJSON());
  
  //este é apenas para teste
  const parcelaVezes: numberOfInstallments[] = [{
    name: 'R$9,00',
    value: 9
  }, {
    name: 'R$13,00',
    value: 13
  }, {
    name: 'R$15,00',
    value: 15
  }, {
    name: 'R$21,00',
    value: 21
  }, {
    name: 'R$24,00',
    value: 24
  }, {
    name: 'R$25,00',
    value: 25
  }, {
    name: 'R$30,00',
    value: 30
  }, {
    name: 'R$40,00',
    value: 40
  }, {
    name: 'R$40,00',
    value: 40
  }];
  
  parcelas.innerHTML = "";
  
  // parcelaVezes.forEach((item, i) => {
  //   const optionValue = parcelas.querySelector('option');
  //   console.log(optionValue);
  //   console.log("aqui é o item", item);
  //   const label = appendChild(
  //     "option",
  //     `                         
  //       ${i} parcela de R$ ${item.name}</option>
  //       `,
  //     parcelas
  //   );

  //   //console.log(parcelaVezes);

  // });

  console.log(parcelaVezes);

  parcelaVezes.forEach((parcela, index)=>{

    const parcelaEl = document.createElement('option');

    parcelaEl.innerHTML = `
    ${index} parcela de R$ ${parcela.name}
    `;

    parcelaEl.dataset.value = `${parcela.value}`; // inserindo dataSet

    parcelas.appendChild(parcelaEl);

  });

}

