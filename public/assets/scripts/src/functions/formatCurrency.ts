export default function formatCurrency(value: number){
    return Number(value)
    .toLocaleString('pt-Br', {
        style:'currency',
         currency:'BRL'
    });
}