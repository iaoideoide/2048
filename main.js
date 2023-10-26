var tablero, puntos = 0, filas = 4, columnas = 4, oldTablero;
const pPuntos = document.getElementById("puntaje");

document.addEventListener("DOMContentLoaded", ()=> {
    tablero = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            let cuadro = document.createElement("div");
            cuadro.id = f.toString() + "-" + c.toString();
            let num = tablero[f][c];
            actualizar(cuadro, num);
            document.getElementById("tablero").append(cuadro);
        }
        
    }   
    dos();
    dos();
    console.log(tablero)

});


function actualizar(cuadro, num) {
    cuadro.innerText = "";
    cuadro.classList.value = "";
    cuadro.classList.add("cuadro");
    if (num > 0) {
        cuadro.innerText = num.toString();
        if (num <= 4096) {
            cuadro.classList.add("x"+num.toString());
        } else {
            cuadro.classList.add("x8192");
        }                
    }
}

function dos() {
    
    let hay = false;
    while (!hay) {
        let f = Math.floor(Math.random() * filas);
        let c = Math.floor(Math.random() * columnas);
        if (tablero[f][c] == 0) {
            let n = Math.floor(Math.random()*10)
            if(n%2 == 0){
                tablero[f][c] = 2;
                let cuadro = document.getElementById(f.toString() + "-" + c.toString());
                cuadro.innerText = "2";
                cuadro.classList.add("x2");
                hay = true;
            }else{
                tablero[f][c] = 4;  
                let cuadro = document.getElementById(f.toString() + "-" + c.toString());
                cuadro.innerText = "4";
                cuadro.classList.add("x4");
                hay = true;
            }
            
        }
    }
}

function vacio() {
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            if (tablero[c][f] == 0) { 
                return true;
            }
        }
    }
    return false;
}

document.addEventListener("keydown", (event) => {
	switch (event.keyCode) {
		case 37:
            guardarEstadoActual();
			LEFT();
            break;
		case 39:
            guardarEstadoActual();
			RIGHT();
			break;
		case 38:
            guardarEstadoActual();
			UP();
			break;
		case 40:
            guardarEstadoActual();    
            DOWN();
			break;
		default:
			break;
	}
    if (vacio()) {   
                dos();
            }
        
            if (!vacio() && noMasMovimientos()) {
                console.log("perdiste");
                perdiste();
            }


});

function mover(fila) {
    fila = cero(fila);
    for (let i = 0; i < fila.length-1; i++){
        if (fila[i] == fila[i+1]) {
            fila[i] *= 2;
            fila[i+1] = 0;
            puntos += fila[i];
            console.log(puntos)
            pPuntos.innerText = puntos;
        }
    } 
    fila = cero(fila); 

    while (fila.length < columnas) {
        fila.push(0);
    }
    return fila;
}

function cero(fila){
    return fila.filter(num => num != 0);
}

function LEFT() {
    for (let f = 0; f < filas; f++) {
        let fila = tablero[f];
        fila = mover(fila);
        tablero[f] = fila;
        for (let c = 0; c < columnas; c++){
            let cuadro = document.getElementById(f.toString() + "-" + c.toString());
            let num = tablero[f][c];
            actualizar(cuadro, num);
        }
    }
}

function RIGHT() {
    for (let f = 0; f < filas; f++) {
        let fila = tablero[f];       
        fila.reverse();              
        fila = mover(fila)            
        tablero[f] = fila.reverse();   
        for (let c = 0; c < columnas; c++){
            let cuadro = document.getElementById(f.toString() + "-" + c.toString());
            let num = tablero[f][c];
            actualizar(cuadro, num);
        }
    }
}

function UP() {
    for (let c = 0; c < columnas; c++) {
        let fila = [tablero[0][c], tablero[1][c], tablero[2][c], tablero[3][c]];
        fila = mover(fila);
        for (let f = 0; f < filas; f++){
            tablero[f][c] = fila[f];
            let cuadro = document.getElementById(f.toString() + "-" + c.toString());
            let num = tablero[f][c];
            actualizar(cuadro, num);
        }
    }
}

function DOWN() {
    for (let c = 0; c < columnas; c++) {
        let fila = [tablero[0][c], tablero[1][c], tablero[2][c], tablero[3][c]];
        fila.reverse();
        fila = mover(fila);
        fila.reverse();
        for (let f = 0; f < filas; f++){
            tablero[f][c] = fila[f];
            let cuadro = document.getElementById(f.toString() + "-" + c.toString());
            let num = tablero[f][c];
            actualizar(cuadro, num);
        }
    }
}

function noMasMovimientos() {  
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            if (c > 0 && tablero[f][c] === tablero[f][c - 1]) {
                return false;
            }
            if (c < columnas - 1 && tablero[f][c] === tablero[f][c + 1]) {
                return false;
            }
            if (f > 0 && tablero[f][c] === tablero[f - 1][c]) {
                return false;
            }
            if (f < filas - 1 && tablero[f][c] === tablero[f + 1][c]) {
                return false;
            }
        }
    }
    return true;
}

function perdiste() {
    console.log("perdiste");
    document.querySelector(".blur").style.display = "flex"; 
    document.getElementById("perdiste").style.display = "block"; 
}


function volver() {
    if (oldTablero) {
        for (let f = 0; f < filas; f++) {
            for (let c = 0; c < columnas; c++) {
                tablero[f][c] = oldTablero[f][c];
                let cuadro = document.getElementById(f.toString() + "-" + c.toString());
                let num = tablero[f][c];
                actualizar(cuadro, num);
            }
        }
    }
    document.querySelector(".blur").style.display = "none";
    document.getElementById("perdiste").style.display = "none";
}

function guardarEstadoActual() {
    oldTablero = tablero.map(row => row.slice());
}

function reiniciar() {
    tablero = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];
    dos();
    dos();
    
    for (let f = 0; f < filas; f++) {
        for (let c = 0; c < columnas; c++) {
            let cuadro = document.getElementById(f.toString() + "-" + c.toString());
            cuadro.innerText = "";
            actualizar(cuadro, 0);
        }
    }

    puntos = 0;
    pPuntos.innerText = puntos;

    document.querySelector(".blur").style.display = "none";
    document.getElementById("perdiste").style.display = "none";
}