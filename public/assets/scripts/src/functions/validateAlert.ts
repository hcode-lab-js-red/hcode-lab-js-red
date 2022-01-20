import { AnyObject } from "../types/anyObject";

export default function ValidadeOrders(orderService: AnyObject, allEls: NodeList, formReset: HTMLFormElement, alert: HTMLDivElement, sucess: HTMLDivElement, btnSave: HTMLButtonElement) {

    if(orderService.bread?.length === 0 || orderService.ingredients?.length === 0){
        
        alert.classList.remove('hiddenAlert');
        alert.classList.add('showAlert');
        setInterval(()=>{
            alert.classList.remove('showAlert');
            alert.classList.add('hiddenAlert');
        }, 5000); // remove validação depois de 5s
        
    } else {
        alert.classList.remove('showAlert');
        alert.classList.add('hiddenAlert');
    } // pedido não preenchido

    if(orderService.bread?.length !== 0 && orderService.ingredients?.length !== 0){
        
        sucess.classList.remove('hiddenAlert');
        sucess.classList.add('showAlert');

        formReset.reset(); // reseta todos os imputs após validação

        allEls.forEach(el=>{
            const elemento = el as HTMLInputElement;
            elemento.checked = false;
        }) // reseta todos os imputs após validação

        

        setInterval(()=>{
            sucess.classList.remove('showAlert');
            sucess.classList.add('hiddenAlert');
        }, 5000); // remove validação depois de 5s
    } // pedido preenchido
}


