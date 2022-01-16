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

    });


    const orderService: OrderService = {
        bread: [],
        ingredients:[]
    }

    const allEls = page.querySelectorAll('[name=item]') as NodeList;

    allEls.forEach(el=>{
        el.addEventListener('click',(evt: Event)=>{

            let itemSelected    = evt.target as HTMLInputElement;
            let jsonIngredients = JSON.parse(itemSelected.dataset.ingredients as string);
            let jsonBread       = jsonIngredients;

            if(itemSelected.type === "radio"){
                if(itemSelected.checked){
                    orderService.bread?.pop();
                    orderService.bread?.push(jsonBread)
                }
            }

            if(itemSelected.type === 'checkbox'){

                if(itemSelected.checked){
                    orderService.ingredients?.push(jsonIngredients)
                } else{
                    orderService.ingredients = orderService.ingredients?.filter(item=>{
                        const itemid = item as any; //ver na consultoria
                        // console.log(itemid.id); // test sucedido
                        return itemid.id !== Number(itemSelected.value);
                    });
                }
            }
            // console.log(orderService) // Mostra o pedido sendo feito
        })
    })

    const saveOrder = document.querySelector('#save-hamburger') as HTMLButtonElement;

    const alert = document.querySelector("#alert") as HTMLDivElement;
    alert.classList.add('hiddenAlert');

    const sucess = document.querySelector("#sucess") as HTMLDivElement;
    sucess.classList.add('hiddenAlert');

    function validadeAlert(){
        if(orderService.bread?.length === 0 || orderService.ingredients?.length === 0){
            alert.classList.remove('hiddenAlert');
            alert.classList.add('showAlert');
            setInterval(()=>{
                alert.classList.remove('showAlert');
                alert.classList.add('hiddenAlert');
            }, 5000)
        } else {
            alert.classList.remove('showAlert');
            alert.classList.add('hiddenAlert');
        }

        if(orderService.bread?.length !== 0 && orderService.ingredients?.length !== 0){
            sucess.classList.remove('hiddenAlert');
            sucess.classList.add('showAlert');
            setInterval(()=>{
                sucess.classList.remove('showAlert');
                sucess.classList.add('hiddenAlert');
            }, 5000)
        }
    }


    saveOrder?.addEventListener('click', (evt: Event)=>{

        validadeAlert();

        const order = JSON.stringify(orderService);
        sessionStorage.setItem('order', order);
    });

}