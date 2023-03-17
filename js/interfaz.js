// startup

let pantallaActual;
let pantallas = document.querySelectorAll('.pantalla');



irAPantalla(0);
//Pantallas:
// 0 -> Splash screen
// 1 -> Tutorial
// 2 -> Juego
// 3 -> Game over


function enableSound(){
  document.getElementById('sound-on').style.display = 'none';
  playSound('inicio');
}

function irAPantalla(numPantalla){
  pantallaActual = numPantalla;
  for(let p of pantallas){
    console.log(p.dataset.numpantalla);
    if(p.dataset.numpantalla == numPantalla){
      p.style.display = 'block';
      continue;
    }
    console.log(p);
    p.style.display = 'none';
  }
}


//------------------------------------------
document.getElementById('jugar-inicio').addEventListener('click', function(){
  irAPantalla(1);
  playFX('click');
});
document.getElementById('omitir').addEventListener('click', function(){
  playFX('click');
  playSound('juego');
  irAPantalla(2);
  restartGame();
});
document.getElementById('jugar').addEventListener('click', function(){
  playFX('click');
  playSound('juego');
  irAPantalla(2);
  restartGame();
});
document.getElementById('jugar-de-nuevo').addEventListener('click', function(){
  playFX('click');
  irAPantalla(2);
  restartGame();
});
document.getElementById('volver-al-inicio').addEventListener('click', function(){
  playFX('click');
  playSound('inicio');
  irAPantalla(0);
});
document.getElementById('sound-on').addEventListener('click', function(){
  enableSound();
});
