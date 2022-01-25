import { getAuth } from "firebase/auth";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";
import { OrdersService } from "./types/ordersService";
import appendChild from "./functions/appendChild";
import formatCurrency from "./functions/formatCurrency";
import format from "date-fns/format";
import { parse } from "date-fns";

import { doc, deleteDoc } from "firebase/firestore";
import { where } from "firebase/firestore";

const auth = getAuth();

const imgAvatar = document.querySelector("img#avatar") as HTMLImageElement;

if (imgAvatar) {
  imgAvatar.src = auth.currentUser?.photoURL ?? "assets/images/user.svg";
  imgAvatar.addEventListener("click", () => {
    location.href = "profile.html";
  });
}

const pageOrders = document.querySelector("#orders-page") as HTMLElement;

if (pageOrders) {
  const db = getFirestore();
  let orders: OrdersService[] = [];
  const listOrders = document.querySelector("#list-orders") as HTMLUListElement;
  const tpl = document.querySelector("#tpl-label") as HTMLScriptElement;

  const allBtnDelete = pageOrders.querySelectorAll("[aria-label=Excluir]");
  const allBtnDetail = pageOrders.querySelectorAll("[aria-label=Detalhes]");
  const allBtnShare = pageOrders.querySelectorAll("[aria-label=Compartilhar]");

  onSnapshot(collection(db, "orders"), (collection) => {
    orders = [];

    collection.forEach((doc) => {
      orders.push(doc.data() as OrdersService);
    });

    renderOrders();
  });

  const renderOrders = () => {
    listOrders.innerHTML = "";

    orders.forEach((item, index) => {
      item.orderNumber = index + 1;
      let hamburgers = "";

      if (item.hamburgers) {
        let content = JSON.parse(item.hamburgers);

        Object.values(content).forEach((hamb, indexh) => {
          hamburgers = hamburgers += `<ul>`;

          hamburgers = hamburgers += `<li class="title">Hambúrguer ${
            indexh + 1
          }</li>`;

          let objeto = Object.values(hamb as any);

          Object.values(objeto).forEach((ing) => {
            let ingredientes = ing as any;

            item.hamburgers = hamburgers += `
                        <li>
                        <span>${ingredientes.name}</span>
                        <span><strong>${formatCurrency(
                          ingredientes.price
                        )}</strong></span>
                        </li>
                        `;
          });

          item.hamburgers = hamburgers += `</ul>`;
        });
      }

      const dateFormated = parse(item.date, "yyyy-MM-dd", new Date());

      item.dateFormated = format(dateFormated, "d'/'MM'/'yyyy");

      item.priceFormated = formatCurrency(item.price);

      let id = item.orderId;

      if (auth.currentUser) {
        if (item.uid === auth.currentUser.uid) {
          appendChild("li", eval("`" + tpl.innerText + "`"), listOrders);
        }

        allBtnDelete.forEach((btn) => {
          btn.addEventListener("click", () => {
            deleteOrders(id);
            console.log("aaa");
          });
        });
      }
    });
  };

  const deleteOrders = (id: string) => {
    deleteDoc(doc(db, "orders", id));
  };
}
