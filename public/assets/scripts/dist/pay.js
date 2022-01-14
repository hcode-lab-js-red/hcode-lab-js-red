"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const queryStringToJSON_1 = __importDefault(require("./functions/queryStringToJSON"));
const setFormValues_1 = __importDefault(require("./functions/setFormValues"));
const imask_1 = __importDefault(require("imask"));
const page = document.querySelector(".page");
const form = page.querySelector("form");
const nome = page.querySelector("#nome");
const number = page.querySelector("#number");
const validate = page.querySelector("#validate");
const code = page.querySelector("#code");
const year = new Date().getFullYear();
(0, setFormValues_1.default)(form, (0, queryStringToJSON_1.default)());
nome.addEventListener("keyup", (e) => {
    nome.value = nome.value.toUpperCase();
    ;
});
(0, imask_1.default)(number, {
    mask: "0000 0000 0000 0000",
});
(0, imask_1.default)(code, {
    mask: "000[0]",
});
(0, imask_1.default)(validate, {
    mask: "MM/YY",
    blocks: {
        YY: {
            mask: imask_1.default.MaskedRange,
            from: year.toString().substring(2, 4),
            to: (year + 10).toString().substring(2, 4),
        },
        MM: {
            mask: imask_1.default.MaskedRange,
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
