/** Utilizamos una libreria llamada underscore
 * la cual es muy utilizada para js, en este caso
 * lo utilizamos para que el arreglo que creamos lo imprima 
 * de manera desordenada o aleatoria */  
let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

const crearDeck = () =>{

    for(let i = 2; i<=10; i++){
        for (let tipo of tipos) {
            deck.push(i+tipo);
        }
    }
    for (let tipo of tipos) {
        for (let especial of especiales){
            deck.push(especial+tipo);
        }
    }

    console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
}

crearDeck();