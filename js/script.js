var canvas;
var context;
var posX = 50;
var posY = 50;
var origen;
var destino;
var boton;
var arrOrigen;
var arrDestino;
var btnConsulta;
var inputId;

function init() {
    arrOrigen = ['uno', 'dos', 'tres', 'cuatro'];
    arrDestino = [];
    origen = document.getElementById('origen');
    destino = document.getElementById('destino');
    boton = document.getElementById('btnMover');
    canvas = document.getElementById('area-dibujo');
    btnConsulta = document.getElementById('btnConsulta')
    inputId = document.getElementById('idsw');
    context = canvas.getContext('2d');
    dibujarCirculo();
    window.addEventListener("keydown", moverImagen, false);
    dibujarArreglo(arrOrigen, origen);
    dibujarArreglo(arrDestino, destino);
    boton.onclick = moverDatos;
    btnConsulta.onclick = consultaSWApi;
}
function dibujarArreglo(arreglo, select) {
    borrarSelect(select);
    arreglo.forEach(x => {
        let option = document.createElement("option");
        option.text = x;
        select.add(option);
    });
}
function moverDatos() {
    arrDestino.push(arrOrigen[origen.selectedIndex]);
    arrOrigen.splice(origen.selectedIndex, 1);
    dibujarArreglo(arrOrigen, origen);
    dibujarArreglo(arrDestino, destino);
}
function dibujarCirculo() {
    context.clearRect(0,0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(posX, posY, 10, 0, 2 * Math.PI);
    context.stroke();
    context.fillStyle = "#FF0045";
    context.fill();
    console.log(arrOrigen);
}

function borrarSelect(elemento) {
    while (elemento.options.length > 0) {                
        elemento.remove(0);
    }   
}

function moverImagen(e) {
    let buffer = 3;
    switch (e.keyCode) {
        case 37 : //iz
            if (posX > 0) {
              posX = posX - buffer;
            }
            break;
            
        case 38 : //up
            posY = posY - buffer;
            break;
        case 39 : //der
            if (posX < canvas.width) {
              posX = posX + buffer;
            }
            break;
        case 40 :
            posY = posY + buffer;
            break;
    }
    dibujarCirculo();
}

function consultaSWApi() {
    let id = inputId.value;
    let http = new XMLHttpRequest();
    http.open('GET', 'https://swapi.co/api/people/' + id + '/', true);
    http.onload = function() {
        var data = JSON.parse(this.response)
        alert(data.name);
    }
    http.send();
}

init();

