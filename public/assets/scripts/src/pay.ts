import queryStringToJSON from "./functions/queryStringToJSON";
import getFormValues from "./functions/getFormValues";
import setFormValues from "./functions/setFormValues";
import { HTMLInputField } from "./types/HTMLInputField";
import IMask from "imask";

const page = document.querySelector(".page") as HTMLElement;

if(page) {
  const form = page.querySelector("form") as HTMLFormElement;
  const nome = page.querySelector("#nome") as HTMLInputElement;
  const number = page.querySelector("#number") as HTMLInputField;
  const validate = page.querySelector("#validate") as HTMLInputField;
  const code = page.querySelector("#code") as HTMLInputField;

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


  /*
  ------------------
  page.querySelectorAll("input").forEach((input) => {
    input.addEventListener("focus", (e) => {
      page.classList.add("keyboard-open");
    });
  });

  page.querySelectorAll("input").forEach((input) => {
    input.addEventListener("blur", (e) => {
      page.classList.remove("keyboard-open");
    });
  });*/

}