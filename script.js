// Creo la variable que utilizaré para almacenar los billetes
var caja = [];
// Creo la variable que utilizareé para almacenar los billetes que entregaré
var entregado = [];
// Creo la variable que utilizaré para saber qué cantidad quiere el usuario
var cantidad = document.getElementById("cantidad");
// creo las variable que utilizaré para saber cuantos billetes quiero
var div = 0;
var papeles = 0;
// Creo la variable que me ayudará a mostrar la información
var informacion = document.getElementById("informacion");
// Creo la variable con la que compararé la caja
var graficoBillete = [];
// Creo una variable con la que acumulare la cantidad de billetes que he entregado.
var acumulable = [];

// capturo en una variable alos graficos de los billetes
var graph50 = document.getElementById("js-graph-cincuenta");
var graph20 = document.getElementById("js-graph-veinte");
var graph10 = document.getElementById("js-graph-diez");

var cIterador = 0;
var contenedorDeImagenes = document.querySelector(".js-container-history");




// Creo la clase que utilizaré para crear los billetes
class Billete
{
    constructor(c, v)
    {
        this.cantidad = c;
        this.valor = v;
    }
}

// Lleno la caja con los billetes
caja.push(new Billete(4, 50));
caja.push(new Billete(3, 20));
caja.push(new Billete(2, 10));


// igualo la cantidad al principio para obtener un porcentaje basado en el punto cero
graficoBillete.push(new Billete(4, 50));
graficoBillete.push(new Billete(3, 20));
graficoBillete.push(new Billete(2, 10));


// Creo la variable para capturar el evento para cuando inicie el proceso
var boton = document.getElementById("boton");
// creo el escuchador de eventos para desencadenar la funcion
boton.addEventListener("click", dispensar);

// Creo la funcion necesaria
function dispensar()
{
    // Actualizo  le campo de dexto con la informacion
    informacion.textContent = "";
    // Capturo el valor que necesito
    var solicitud = parseInt(cantidad.value);
    // Capturo el valor insertado para la factura
    var solicitud_f = parseInt(cantidad.value);
    // variable que guardan las cantidades iniciales y finales
    var principio;
    var final;
    var encontrado = false;

    // Comienza el algoritmo
    for(var billete of caja)
    {
        // preguntamos si la solicitud es valida
        if(solicitud > 0)
        {
            // hago la división para saber cuantos billetes necesito de esa cantidad
            div = Math.floor(solicitud / billete.valor)
            // consulto si tengo esa cantidad de billetes de esa denominacion
            if(div > billete.cantidad)
            {
                // Si la cantidad que necesito es mayor a la que dispongo le asigno todos los billetes
                // disponibles en ese momento
                papeles = billete.cantidad
            }
            else
            {
                // Si la cantidad que necesito no es mayor que la que dispongo le asigno
                // solo la que necesito
                papeles = div;
            }
            // Pregunto si es mayor a 0, es decir, si tome billetes de esa denominacion
            if(papeles > 0)
            {
                entregado.push(new Billete(papeles, billete.valor));
            }
            // reservo los billetes en un lugar para entregarlos
            // Actualizo el monto de la solicitud
            solicitud = solicitud - parseInt(papeles * billete.valor);
        }
    }
    // Si todavia me falta dinero en mi solicidtud
    if(solicitud > 0)
    {
        entregado = []
        informacion.textContent = "No puedo dispensar esa cantidad";
    }
    // Si no; entrego los billetes necesitas y descuento los que entrego de la caja
    else
    {
        // creo un ciclo que itera los billetes que tengo guardados en la variable entregados
        for(var actual of entregado)
        {
            // creo un ciclo que itera los billetes que tengo en la caja
            for(var original of caja)
            {
                // Comparo si el billete que esta iterando en los que tengo que entregar es
                // el mismo que el que esta en la caja
                if(actual.valor == original.valor)
                {
                    // si es asi le actualizo la cantidad
                    original.cantidad = original.cantidad - actual.cantidad;

                    // Ciclo para buscar cuanto tenia en un principio de ese billete
                    for(var canon of graficoBillete)
                    {
                        // Comparo si los el billete actual (el que tengo que entregar)
                        // es igual a alguno que este en mi arreglo base de billetes
                        if(canon.valor == actual.valor)
                        {
                            // Si es asi; tomo la cantidad que correspondia a ese billete
                            // en un principio
                            principio = canon.cantidad;
                            console.log("Tenia antes: " + principio);

                            // Consulto si tengo billetes acumulados para el porcentaje de diferencia
                            // Si no tengo billetes, es decir el arreglo esta vacio
                            if(acumulable == "")
                            {
                                // Creo un nuevo billete
                                acumulable.push(new Billete(actual.cantidad, actual.valor));
                                // Asigno el valor final de dicho billete
                                final = principio - acumulable[0].cantidad;

                                console.log("Tengo ahora: " + final);
                                console.log("Lo meti " + final);
                            }
                            // Si el arreglo no esta vacio, quiere decir que hay billetes dentro
                            // y debo hacer un ciclo para buscar coincidencias con el billete actual
                            else
                            {
                                // Creo un ciclo que recorra los billetes acumulados
                                for(var acumulado of acumulable)
                                {
                                    // Pregunto si el billete acumulado es de igual valor que
                                    // El billete que tengo que entregar
                                    if(acumulado.valor == actual.valor)
                                    {
                                        // Le sumo la cantidad al acumulado
                                        acumulado.cantidad = acumulado.cantidad + actual.cantidad
                                        // Saco un nuevo valor de final
                                        final = principio - acumulado.cantidad;

                                        encontrado = true;
                                        console.log("Tengo ahora un conocido: " + final);
                                    }
                                }

                                // Pregunto si encontre el billete
                                if(encontrado == false)
                                {
                                    // Si estoy en la ultima posición y aun los valores no se parecen
                                    // Quiere decir que no tengo el elemento. Entonces lo creo
                                    acumulable.push(new Billete(actual.cantidad, actual.valor));
                                    // ACtualizo el valor de final
                                    final = principio - actual.cantidad;
                                    console.log("Tengo ahora un diferente: " + final);

                                }
                            }

                            // Actualizo los graficos
                            // saco el porfentaje de diferencia entre ambos valores
                            var porcentaje = porcentajeDiferencia(principio, final)
                            // Se lo resto al 100%
                            porcentaje = 100 - porcentaje;
                            console.log(porcentaje);

                            // Actualizo los graficos
                            var texto = "linear-gradient(to right, brown 0% , brown ";
                            var texto_b = "%, transparent ";
                            var textoCompleto = texto +  porcentaje + texto_b + porcentaje + "%)"

                            // Asigno el nuevo valor al billete que se itera
                            if(actual.valor == 50)
                            {
                                graph50.style.background = textoCompleto;
                                console.log("actualizo 50");
                            }
                            if(actual.valor == 20)
                            {
                                graph20.style.background = textoCompleto;
                                console.log("actualizo 20");
                            }
                            if(actual.valor == 10)
                            {
                                graph10.style.background = textoCompleto;
                                console.log("actualizo 10");
                            }
                        }
                    }
                }
            }
        }
        // Aumento el iterador
        cIterador = cIterador + 1;
        // Dibujo el historial
        dibujarCard(cIterador, solicitud_f, entregado);

        principio = 0;
        final = 0;
        entregado = [];
    }
}

// Funcion que saca el porcetanje de diferencia entre la cantidad inicial
// Ubicada en graficoBillete y la cantidad acutal ubicada en caja
function porcentajeDiferencia(vInicial, vFinal)
{
    var r = vInicial - vFinal;
    var f = r / vInicial;
    var p = f * 100;
    return p;
}

function dibujarCard(iterador, cDispensada, nombreArreglo)
{
    // Creo todas las etiquetas que necesitare para armar la card
    const card = document.createElement("article");
    const card__title = document.createElement("h2");
    const card__text = document.createElement("p");
    const card__amount = document.createElement("span");
    const card__images_container = document.createElement("div");

    // Le asigno a cada etiqueta las clases que se necesitan
    card.classList.add("js-history");
    card__title.classList.add("js-history__title");
    card__text.classList.add("js-history__amount");
    card__amount.classList.add("js-amount");
    card__images_container.classList.add("js-history__container-images");

    // Empiezo a asignar los datos de los elementos
    // Le asigno el titulo de la operacion (REF)
    card__title.textContent = "Transaccion #00" + iterador;
    console.log("Iterador " + iterador);


    // Texto del dispensado
    card__text.textContent = "Dispensado: ";
    card__amount.textContent = cDispensada;

    // Empiezo a dibujar los elementos
    // Le asigno a contenedorProgramas (el contenedor que contiene los programas) un hijo de tipo card
    contenedorDeImagenes.appendChild(card);

    // A la card le asigno sus hijos
    card.appendChild(card__title);
    card.appendChild(card__text);
    card.appendChild(card__images_container);

    // Le asigno el texto que tendra la cantidad
    card__text.appendChild(card__amount)

    // Espero recorrer el arreglo que tiene los billetes entregado
    for(var cImagen of nombreArreglo)
    {
        // por cada billete voy a dibujarlo la cantidad de veces que lo entregue
        for(var i = 0; i< cImagen.cantidad; i++)
        {
            // creo la variable para dibujarlo
            const card__images = document.createElement("img");
            // Le asigno los atributos que necesito para la imagen
            card__images.src= "img/" + cImagen.valor + ".png";
            card__images.classList.add("js-history__images");
            // Le asigno las imagenes al contenedor
            card__images_container.appendChild(card__images);
        }
    }
}
