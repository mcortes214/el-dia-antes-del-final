
//Variables de juego, a usar dentro del sketch.
let chasers;
let comidas;
let jugador;
let badDimension;
let luzEvil, luzGood, fondoEvil, fondoGood, warp,
spriteJugador, spriteAliado, spriteEnemigo;
let puntaje;
let vida;
let intervaloSpawn;

//P5 - ejecución. Rellenar el sketch una vez definidos el objeto p5 y las clases
// que interactúan con él

//Funciones de utilidad

function restartGame(){
  p.draw = ''; //Detener loop
  clearInterval(intervaloSpawn); //detener spawn
  p.setup(); //Reiniciar variables
  p.draw = contenidoDraw;
}

function actualizarVida(valorNuevo){
  vida = valorNuevo;
  if(vida > 100){
    vida = 100;
  }
  let barraDeVida = document.getElementById('indicador-vida_fill');
  barraDeVida.style.width = vida*2.5 + 'px';
  if (vida <= 0){
    morir();
  }
}

function actualizarPuntaje(pts){
  puntaje = pts;
  document.getElementById('puntaje').innerHTML = pts;
}

function morir(){
  alive=false;
  let personasRescatadas = 'Rescataste a '+puntaje+' humanos del apocalipsis';
  document.getElementById('personas-rescatadas').innerHTML = personasRescatadas;
  irAPantalla(3);

}

function rgba(r,g,b,a){
  return 'rgba('+r+','+g+','+b+','+a+')';
}


//Función a ser ejecutada en el loop de Draw

let contenidoDraw = function(){

  p.noStroke();
  if(badDimension){
    p.image(fondoEvil,0,0);
  }
  else {
    p.image(fondoGood,0,0);
  }
  if(!alive){
    return;
  }
  for (var i = 0; i < chasers.length; i++) {
    chasers[i].update();
    if(badDimension){
      chasers[i].render();
    }
  }
  for (var i = 0; i < comidas.length; i++) {
    comidas[i].update();
    if(!badDimension){
      comidas[i].render();
    }
  }

  jugador.updateToMouse(p.mouseX, p.mouseY);
  jugador.render();

  if(badDimension){
    p.image(luzEvil,0,0);
  }
  else {
    p.image(luzGood,0,0);
  }

};



// FUNCIONES DE EJECUCIÓN DE GAMEPLAY - ejecutar de nuevo en cada partida

//--------------

p.setup = function(){

    //Los valores se inicializan todos acá, así puedo reiniciar la partida
    // reiniciando solamente el setup.

    chasers = [];
    comidas = [];
    jugador = '';
    badDimension = true;
    luzEvil, luzGood, fondoEvil, fondoGood, warp,
    spriteJugador, spriteAliado, spriteEnemigo = '';
    if(pantallaActual == 2){
      alive = true;
    }
    else {
      alive = false;
    }
    intervaloSpawn = '';
    actualizarVida(100);  //Estas funciones también manejan la interfaz, no solo valores
    actualizarPuntaje(0);

    p.createCanvas(500, 500);
    //Cargar imágenes
    luzEvil = p.loadImage('img/fondo-evil-sup.png');
    luzGood = p.loadImage('img/fondo-good-sup.png');
    fondoEvil = p.loadImage('img/fondo-evil-base-t.png');
    fondoGood = p.loadImage('img/fondo-good-base-t.png');
    warp = p.loadImage('img/warp.png');
    spriteJugador = p.loadImage('img/sprite-jugador.png');
    spriteAliado = p.loadImage('img/sprite-humano.png');
    spriteEnemigo = p.loadImage('img/sprite-enemigo.png');

    //Crear jugador
    jugador = new Jugador(0, 0, 0, 0, spriteJugador);

    //Crear enemigos
    for (var i = 0; i < enemigosIniciales; i++) {
      chasers[i] = new Chaser(p.width/2, p.height/2, p.random(-2,2), p.random(-2,2), spriteEnemigo);
    }
    //Crear comida
    for (var i = 0; i < cantidadComida; i++) {
      comidas[i] = new Food(p.width/2, p.height/2, p.random(-2,2), p.random(-2,2), spriteAliado);
    }

    //Spawn rate
    intervaloSpawn = window.setInterval(function(){
      chasers.push(new Chaser(p.width/2, p.height/2, p.random(-2,2), p.random(-2,2), spriteEnemigo));
    }, segundosHastaProximoEnemigo * 1000);
  }

//--------------

p.keyPressed = function() {
  if (p.key === ' ') {
    badDimension = !badDimension;
    p.image(warp, 0, 0);
  }
}

//--------------

p.draw = contenidoDraw;
