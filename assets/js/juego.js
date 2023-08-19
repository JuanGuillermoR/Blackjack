/** Utilizamos una libreria llamada underscore
 * la cual es muy utilizada para js, en este caso
 * lo utilizamos para que el arreglo que creamos lo imprima
 * de manera desordenada o aleatoria */
let deck = [];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

let puntosJugador = 0,
    puntosComputadora = 0;
//REFERENCIAS DEL HTML
const btnPedir = document.querySelector('#btnPedir');
const btnNuevoJuego = document.querySelector('#btnNuevoJuego');
const btnDetener = document.querySelector('#btnDetener');

// console.log(btnPedir);

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small');

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
    // console.log(deck);
    // console.log(carta); // carta debe ser de la bajara
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
// const valor = valorCarta(pedirCarta());
// console.log({valor});



// TURNO DE LA COMPUTADORA
const turnoComputadora = (puntosMinimos) =>{
    do{
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        divCartasComputadora.append(imgCarta);
        if (puntosMinimos > 21) {
            break;
        }

    }while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {
        if(puntosComputadora === puntosMinimos){
            alert('Nadie gana')
        }else if ( puntosMinimos > 21){
            alert('Computadora gana')
        }else if(puntosComputadora > 21){
            alert('Jugador Gana')
        } else{
            console.log('Computadora gana');
        }
    }, 100);

};



// EVENTOS
/**
 *  addEventListener lleva 2 elementos 1. El elemento que quiero estar escuchando
 *  2. Es una funcion especial - Callback es una funcion que se esta llamando como argumento
 *  callback es decir que es una funcion que se esta mandando como argumento
 *
*/


/**
 *  ` ` Se le llaman back ticks
*/

/**
 *  Utilizamos el atributo disabled para bloquear el boton
 *  y no permita que sigamos generando mas cartas
*/
btnPedir.addEventListener('click', ()=>{
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Lo siento mucho, perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }else if (puntosJugador === 21) {
        console.warn('21, genial!');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
});


btnDetener.addEventListener('click', ()=>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);
})

btnNuevoJuego.addEventListener('click', ()=>{
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    deck = [];
    deck = crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';
})