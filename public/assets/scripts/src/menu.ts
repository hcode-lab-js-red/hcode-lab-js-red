import formatCurrency from "./functions/formatCurrency";
import { Bread } from "./types/bread";
import { Ingredient } from "./types/ingredient";
import { OrderService } from "./types/orderService";


const page = document.querySelector("#menu") as HTMLElement;

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
            name:"Carne Bovina 125g",
            price:3
        },
        {
            id:5,
            name:"Carne de Frango 125g",
            price:2.5
        },
        {
            id:6,
            name:"Carne de Peixe 125g",
            price:2
        },
        {
            id:7,
            name:"Carne Bovina 125g",
            price:3
        },
        {
            id:8,
            name:"Carne de Frango 125g",
            price:2.5
        },
        {
            id:9,
            name:"Carne de Peixe 125g",
            price:2
        },

    ];


    const listBreads = page.querySelector("#breads ul")as HTMLLIElement;
          listBreads.innerHTML = "";

    breads.forEach(bread=>{

        const breadEl = document.createElement('li') as HTMLLIElement;

        breadEl.innerHTML = `
        <label>
            <input type="radio" name="item" value="${bread.id}" data-ingredients/>
            <span></span>
            <h3>${bread.typeBread}</h3>
            <div>${formatCurrency(bread.price)}</div>
        </label>
        `;

         listBreads.appendChild(breadEl);

         const breadGroup = breadEl.querySelector('[name=item]') as HTMLInputElement;
         const itemStringfy = JSON.stringify(bread)
         breadGroup.dataset.ingredients = itemStringfy;

         getTheHamburger(breadGroup);
    });


    const listIngredients = page.querySelector("#ingredients ul")as HTMLLIElement;
          listIngredients.innerHTML = "";

    ingredients.forEach(ingredient=>{

        const ingredienteEl = document.createElement('li') as HTMLLIElement;

        ingredienteEl.innerHTML= `
        <label>
            <input type="checkbox" name="item" value="${ingredient.id}" />
            <span></span>
            <h3>${ingredient.name}</h3>
            <div>${formatCurrency(ingredient.price)}</div>
        </label>
        `;

        listIngredients.appendChild(ingredienteEl);

        const ingredientsGroup = ingredienteEl.querySelector('[name=item]') as HTMLInputElement;

        const itemStringfy = JSON.stringify(ingredient)
        ingredientsGroup.dataset.ingredients = itemStringfy;

        getTheHamburger(ingredientsGroup);

    });

    // const orderService:Object[] = [];
    const orderService: OrderService = {
        id:0,
        bread:[],
        ingredients:[]
    }

    function getTheHamburger(radioEls: HTMLInputElement){
        radioEls?.addEventListener('click', (evt:Event)=>{

            const radioEl = evt.target as HTMLInputElement;
            // console.log(radioEls)

            [radioEls].forEach((item, index)=>{
                const itemMenu = item as HTMLInputElement;
                if(itemMenu.checked){
                    const validabread = itemMenu.dataset.ingredients;
                    const validadeIngredients = itemMenu.dataset.ingredients;

                    const jsonBread = JSON.parse(validabread as string);
                    const jsonIngredient = JSON.parse(validadeIngredients as string);

                    if(jsonBread){
                        if(jsonBread.typeBread){
                            // console.log(jsonBread)
                            if(orderService.bread?.length === 1){
                                orderService.bread?.pop()
                                orderService.bread?.push(jsonBread)
                            } else{
                                orderService.bread?.push(jsonBread)
                            }

                        }
                    }

                    if(jsonIngredient){
                        if(jsonIngredient.name){
                            //   orderService.ingredients?.push(jsonIngredient);
                            console.log(jsonIngredient)
                        }
                    }
                } else if (itemMenu.checked === false){
                    orderService.bread?.pop()
                }
            })

            console.log(orderService)
        })
    }




}