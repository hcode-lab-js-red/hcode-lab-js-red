import { getAuth } from "firebase/auth";
import { getFirestore, onSnapshot, collection } from "firebase/firestore";
import { OrdersService } from "./types/ordersService";
import appendChild from "./functions/appendChild";
import formatCurrency from "./functions/formatCurrency";
import format from "date-fns/format";
import { parse } from "date-fns";

import { doc, deleteDoc } from "firebase/firestore";
import { where } from "firebase/firestore";
import { id } from "date-fns/locale";
import { getMetadata } from "firebase/storage";

const auth = getAuth();

const imgAvatar = document.querySelector("img#avatar") as HTMLImageElement;

if (imgAvatar) {
  imgAvatar.src = auth.currentUser?.photoURL ?? "assets/images/user.svg";
  imgAvatar.addEventListener("click", () => {
    location.href = "profile.html";
  });
}

const pageOrders = document.querySelector("#orders-page") as HTMLElement;

<<<<<<< HEAD
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
=======
if(pageOrders) {

    const db = getFirestore();
    let orders: OrdersService[] = [];
    const listOrders = document.querySelector("#list-orders") as HTMLUListElement;
    const tpl = document.querySelector("#tpl-label") as HTMLScriptElement;

   

    onSnapshot(collection(db, "orders"), (collection) => {
        
        orders = [];

        collection.forEach((doc) => {

            let data = doc.data();


            if(auth.currentUser) {

                if (data.uid === auth.currentUser.uid) {
    
                    orders.push((doc.data() as OrdersService));
                    
                }
                
            }

            
        });

        
        renderOrders();

        getData();

    });

   



    

    
    const renderOrders = () => {
        
        listOrders.innerHTML = "";

        
        orders.forEach((item, index) => {
>>>>>>> 160c8f2bb647fea16c83bac21fafbac75427d4cd

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
<<<<<<< HEAD
                        `;
          });
=======
                        `
                   })

                   item.hamburgers = hamburgers += `</ul>`



                });

            }

            const dateFormated = parse(item.date, 'yyyy-MM-dd', new Date());
            
            item.dateFormated = format(dateFormated, "d'/'MM'/'yyyy");
            
            item.priceFormated = formatCurrency(item.price);

            const orderId: string = item.orderId;

            // if(auth.currentUser) {

            //     if (item.uid === auth.currentUser.uid) {
    
                    appendChild("li", eval("`"+ tpl.innerText + "`"), listOrders);
            //     }
                
            // }
>>>>>>> 160c8f2bb647fea16c83bac21fafbac75427d4cd

          item.hamburgers = hamburgers += `</ul>`;
        });
      }

      const dateFormated = parse(item.date, "yyyy-MM-dd", new Date());

<<<<<<< HEAD
      item.dateFormated = format(dateFormated, "d'/'MM'/'yyyy");

      item.priceFormated = formatCurrency(item.price);
=======
    }

    const getData = () => {

    const allBtnDelete = pageOrders.querySelectorAll("#btn-delete") as NodeList;
    const allBtnDetail = pageOrders.querySelectorAll("[aria-label=Detalhes]") as NodeListOf<HTMLButtonElement>;
    const allBtnShare = pageOrders.querySelectorAll("[aria-label=Compartilhar]") as NodeListOf<HTMLButtonElement>;

    if (pageOrders) {

        const listOrders = pageOrders.querySelector("#list-orders") as HTMLUListElement;

         function deleteOrder(id:string) {
            return deleteDoc(doc(db, "orders", id))
        }

        // if(listOrders) {
            
        //     let getOrderId = listOrders.querySelectorAll("li .id");

        //         listOrders.querySelectorAll("li .id");
        //         getOrderId.forEach(id => {
        //             let idPedido = id.getAttribute("id");
        //             console.log(idPedido);

        //         })

        //     }
            
            allBtnDelete.forEach((btn) => {
                btn.addEventListener("click",()=>{
                    const liAtual = btn.parentNode?.parentElement
                    const id = liAtual?.querySelector(".id")
                    const idAtual = id?.getAttribute("id") as string
                    // console.log("Clique no botão deletar");
                    deleteOrder(idAtual)
                    // console.log("Deletado");
                    
                });
            });

            allBtnShare.forEach((btn) => {
                btn.addEventListener("click",()=>{
                    // deleteOrder(idPedido)
                    console.log("Clique no botão Compartilhar");
                    
                });
            });

            allBtnDetail.forEach((btn) => {
                btn.addEventListener("click",()=>{
                    const liAtual = btn.parentNode?.parentElement
                    const id = liAtual?.querySelector(".id")
                    const idAtual = id?.getAttribute("id-") as string
                    console.log("Clique no botão Detalhes");
                    
                });
            });

            
        }


    }
>>>>>>> 160c8f2bb647fea16c83bac21fafbac75427d4cd

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
<<<<<<< HEAD
=======


// // Veriica status do login
// onAuthStateChanged(auth, () => {
//     // Se está logado continua, senão vai pro login
//     if (auth.currentUser) {
//     } else {
//         location.href = "login.html";
//     }
// });


>>>>>>> 160c8f2bb647fea16c83bac21fafbac75427d4cd
