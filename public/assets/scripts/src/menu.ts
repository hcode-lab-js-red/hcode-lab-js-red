import appendChild from "./functions/appendChild";
import formatCurrency from "./functions/formatCurrency";
import { AnyObject } from "./types/anyObject";
import { Bread } from "./types/bread";
import { Ingredient } from "./types/ingredient";
import { OrderService } from "./types/orderService";


const page = document.querySelector("#menu") as HTMLElement;
const formCreateHamburger = document.querySelector('#create-hamburger') as HTMLFormElement;
if(page){

    const breads:Bread[] = [{
            id:1,
            typeBread:'Pão Tradicional',
            price:2
        },
        {
            id:2,
            typeBread:'Pão Australiano',
            price:3
        },
        {
            id:3,
            typeBread:'Pão de Batata',
            price:2.5
        },
        {
            id:4,
            typeBread:'Pão de Dinamite',
            price:5
        },

    ];


    const ingredients:Ingredient[] = [
        {
            id:1,
            name:"Carne Bovina 125g",
            price:3
        },
        {
            id:2,
            name:"Carne de Frango 125g",
            price:2.5
        },
        {
            id:3,
            name:"Carne de Peixe 125g",
            price:2
        },
        {
            id:4,
            name:"Folha de Alface",
            price:1
        },
        {
            id:5,
            name:"Tomate",
            price:1
        },
        {
            id:6,
            name:"Picles",
            price:1
        },
        {
            id:7,
            name:"Queijo Cheddar 50g",
            price:2.5
        },
        {
            id:8,
            name:"Queijo Mussarela 50g",
            price:2
        },
        {
            id:9,
            name:"Molho Barbecue",
            price:1.5
        },

        {
            id:10,
            name:"Molho da Casa",
            price:2
        },

    ];

    
    let orders: object[] = [];
    let idClick: number = 0;
    const orderService: OrderService = {
            id: idClick,
            bread: [],
            ingredients: []
        };

    // listar pães
    const listBreads = page.querySelector("#breads ul") as HTMLLIElement;
    listBreads.innerHTML = "";

    const renderBreads = () => {

        breads.forEach(bread =>{
            const breadEl = document.createElement('li') as HTMLLIElement;

            breadEl.innerHTML = `
                <label>
                    <input type="radio" name="item" value="${bread.id}" data-ingredients/>
                    <span></span>
                    <h3>${bread.typeBread}</h3>
                    <div>${formatCurrency(bread.price)}</div>
                </label>
                `;

            const breadGroup = breadEl.querySelector('[name=item]') as HTMLInputElement;
            const itemStringfy = JSON.stringify(bread);
            breadGroup.dataset.ingredients = itemStringfy;

            listBreads.appendChild(breadEl);
        });
    };

    //listar ingredients

    const listIngredients = page.querySelector("#ingredients ul")as HTMLLIElement;
          listIngredients.innerHTML = "";

    const renderIngredients = () => {
        ingredients.forEach(ingredient=>{

            const ingredienteEl = document.createElement('li') as HTMLLIElement;

            ingredienteEl.innerHTML= `
            <label>
                <input type="checkbox" name="item" value="${ingredient.id}" data-ingredients />
                <span></span>
                <h3>${ingredient.name}</h3>
                <div>${formatCurrency(ingredient.price)}</div>
            </label>
            `;

            const ingredientsGroup = ingredienteEl.querySelector('[name=item]') as HTMLInputElement;

            const itemStringfy = JSON.stringify(ingredient)
            ingredientsGroup.dataset.ingredients = itemStringfy;

            listIngredients.appendChild(ingredienteEl);
        });
    }

    renderBreads();
    renderIngredients();

    const allEls = page.querySelectorAll('[name=item]') as NodeList;

    allEls.forEach(el=>{

        el.addEventListener('change', (evt: Event)=>{

            const elSelected = evt.target as HTMLInputElement;

            if(elSelected.type === "radio"){
                if(elSelected.checked){
                    orderService.bread = [];
                    orderService.id = idClick++;
                    const jsonBread = JSON.parse(elSelected.dataset.ingredients as string);
                    orderService.bread?.push(jsonBread);
                }
            }

            if(elSelected.type === "checkbox"){
                if(elSelected.checked){
                    const jsonIngredients = JSON.parse(elSelected.dataset.ingredients as string);
                    orderService.ingredients?.push(jsonIngredients);
                } else{

                    // orderService.ingredients = orderService.ingredients?.filter(id =>{
                    //     const idSelected = id as object;
                    //     console.log('idSelect', idSelected);
                    //     // return id !== Number(elSelected.value);
                    // orderService.ingredients
                    // });

                    orderService.ingredients = orderService.ingredients?.filter(item=>{
                        const itemid = item as any; //ver na consultoria
                                    // console.log(itemid.id); // test sucedido
                        return itemid.id !== Number(elSelected.value);
                    });
                    
                    return false;
                }
            }

        })
    });


    function sendLocalStorange(){
        if(orderService.bread?.length === 0 || orderService.ingredients?.length === 0){
            return false;
        } else{
            orders.push(orderService as object);
            const orderString = orderService; // transfdrmar em strigfy

            const jsonOrders = JSON.stringify(orders);
            localStorage.setItem('allOrders', jsonOrders);
        }

    }


    const aside = document.querySelector('aside') as HTMLElement;

    const orderElList = aside.querySelector('ul#orderList') as HTMLUListElement;
    orderElList.innerHTML = '';

    const tray = aside.querySelector('header small') as HTMLElement;
    tray.innerText = "esta vazia.";

    const renderTray  = () =>{

        let ordersFiltered = orders.filter(order=>{
            const selectOrder = order as AnyObject;
            return selectOrder.bread.length !== 0 && selectOrder.ingredients.length !== 0;
        }); // retorna array filtrado já

        if(ordersFiltered.length === 0){
            tray.innerText = "esta vazia."
        } else {
            tray.innerText = `${(ordersFiltered.length)} hamburguer(s)`;
        }

    };

    const getLocalStorange = ()=>{
        const localAllOders = JSON.parse(localStorage.getItem('allOrders') as string);
        console.log(localAllOders)
        
    }

    const saveOrder = document.querySelector('#save-hamburger') as HTMLButtonElement;

    saveOrder?.addEventListener('click', ()=>{

        
        sendLocalStorange();
        formCreateHamburger.reset();

        allEls.forEach(el=>{
            const elSelect = el as HTMLInputElement;
            if(elSelect.checked === false){
                orderService.id = idClick++;
                orderService.bread = [];
                orderService.ingredients = [];
            }
        });
        
        renderTray();
        getLocalStorange();
    });


}




