import { hu } from "date-fns/locale";
import appendChild from "./functions/appendChild";
import formatCurrency from "./functions/formatCurrency";
import { AnyObject } from "./types/anyObject";
import { Bread } from "./types/bread";
import { Ingredient } from "./types/ingredient";
import { OrderService } from "./types/orderService";


const page = document.querySelector("#menu") as HTMLElement;
const formCreateHamburger = document.querySelector('#create-hamburger') as HTMLFormElement;
if(page){

    const breads:Ingredient[] = [{
            id:1,
            name:'Pão Tradicional',
            price:2
        },
        {
            id:2,
            name:'Pão Australiano',
            price:3
        },
        {
            id:3,
            name:'Pão de Batata',
            price:2.5
        },
        {
            id:4,
            name:'Pão de Dinamite',
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
                    <h3>${bread.name}</h3>
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

    const aside = document.querySelector('aside') as HTMLElement;

    const orderElList = aside.querySelector('ul#orderList') as HTMLUListElement;
    orderElList.innerHTML = '';

    const tray = aside.querySelector('header small') as HTMLElement;
    tray.innerText = "esta vazia.";

    const renderTray  = () =>{

        const currentTray = getLocalStorange();
        let totalTray = 0;

        orderElList.innerHTML = "";

        currentTray.forEach((hamburger, index) =>{
            const hamburgerEl = document.createElement("li");

            const totalHamburger = hamburger.map(ingredient=> ingredient.price).reduce((a, b)=> a + b, 0);

            totalTray += totalHamburger;

            hamburgerEl.innerHTML = `

                <div>Hamburguer ${(index + 1)}</div>
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

    const getLocalStorange = ():(Ingredient[])[]=>{
       
        try{
            const localAllOders = JSON.parse(localStorage.getItem('allOrders') as string);
            if(!localAllOders){
                return [] as (Ingredient[])[];
            }
            return localAllOders as (Ingredient[])[];
        }catch(err){
            console.error(err);
            return [] as (Ingredient[])[];
        }

    }

    const saveOrder = document.querySelector('#save-hamburger') as HTMLButtonElement;

    saveOrder?.addEventListener('click', ()=>{

        const allEls = page.querySelectorAll('[name=item]') as NodeList;

        // sendLocalStorange();
        const hamburger: Ingredient[] = [];
        const currentTray = getLocalStorange();

        allEls.forEach(el=>{
            const elSelect = el as HTMLInputElement;

            if(elSelect.checked){
                const jsonIngredient: Ingredient = JSON.parse(elSelect.dataset.ingredients as string);
                hamburger.push(jsonIngredient);
            }

        });
        
        currentTray.push(hamburger); //coloca na bandeja

        localStorage.setItem("allOrders", JSON.stringify(currentTray));

        formCreateHamburger.reset();

        renderTray();

    });

    

}




