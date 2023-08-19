/** Utilizamos una libreria llamada underscore
 * la cual es muy utilizada para js, en este caso
 * lo utilizamos para que el arreglo que creamos lo imprima 
 * de manera desordenada o aleatoria */  
let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

//Esta funcion crea una nueva  baraja
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

    // console.log(deck);
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

crearDeck();

//Esta funcion permite tomar una carta
//deck.pop va a remover el ultimo elemento del arreglo y lo regresa 
// Throw muestra un error en cosola y deja de ejecutarse el codigo.
const pedirCarta = () =>{
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();
    console.log(deck);
    console.log(carta); // carta debe ser de la bajara
    return carta;
}

// for (let i=0; i<=100; i++) {
//     pedirCarta();
// }

// pedirCarta();

// Esta funcion permite saber el valor de cada carta, utilizamos el metodo .substring
// ya que este metodo se utiliza para extraer una porcion de un string, en resumoes lo 
// que se hizo fue que el subtring comience desde el index 0 y al ultimo elemento carta.length -1
// lo elimine, de esa manera siempre eliminara la ultima letra

/** En js existe una funcion interna llamada isNaN() is not a number evalua lo que hay dentro
 * del parentesis y retorna si es un numero o no,
*/

/**
 * Una de las maneras mas faciles de convertir un string numero a un numero es multiplicarlo por 1 
 */
const valorCarta = (carta) =>{
    const valor = carta.substring(0, carta.length -1);
    return (isNaN(valor))?
        (valor === 'A')?11 : 10 
        : valor * 1;
    
    // let puntos = 0;
    // if (isNaN(valor)) {
    //     console.log('No es número');
    //     puntos = (valor === 'A') ? 11 : 10;
    // }else{
        
    //     puntos = valor*1;
    // }
}  
const valor = valorCarta(pedirCarta());
console.log({valor});