import { getAuth } from "firebase/auth";
import {getFirestore, onSnapshot, collection} from "firebase/firestore";
import { OrdersService } from "./types/ordersService";
import appendChild from "./functions/appendChild";
import formatCurrency from "./functions/formatCurrency";
import format from 'date-fns/format';
import { parse } from "date-fns";

const auth = getAuth();

const pageOrders = document.querySelector("#orders-page") as HTMLElement;

if(pageOrders) {

    const db = getFirestore();
    let orders: OrdersService[] = [];
    const listOrders = document.querySelector("#list-orders") as HTMLUListElement;
    const tpl = document.querySelector("#tpl-label") as HTMLScriptElement;


    onSnapshot(collection(db, "orders"), (collection) => {
        
        orders = [];

        collection.forEach(doc => {
            orders.push(doc.data() as OrdersService);
        });

        renderOrders();

    });
    

    const renderOrders = () => {
        
        listOrders.innerHTML = "";

        
        orders.forEach((item, index) => {

            item.orderNumber = (index + 1);

            // if(item.hamburgers) {

            //     let content = JSON.parse(item.hamburgers);

            //     // let a =  JSON.stringify(content)
                
            //     // console.log(a);

            //     var obj = JSON.parse(item.hamburgers);

            //     var teste = JSON.stringify(obj)

            //     teste.map(ingredient=> ingredient.price)

            //     // console.log(Object.keys(obj));
            //     // console.log(Object.values(obj));

            
                  


            // }
             

            const dateFormated = parse(item.date, 'yyyy-MM-dd', new Date());
            
            item.dateFormated = format(dateFormated, "d'/'MM'/'yyyy");
            
            item.priceFormated = formatCurrency(item.price);

            if(auth.currentUser) {

                if (item.uid === auth.currentUser.uid) {
    
                    appendChild("li", eval("`"+ tpl.innerText + "`"), listOrders);
                }
            }


        });

    }
    
}

