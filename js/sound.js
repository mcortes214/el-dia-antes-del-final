let soundsList = {
  'inicio' : document.getElementById('inicio'),
  'juego' : document.getElementById('juego'),
  'click' : document.getElementById('click')
};

function playSound(nombre){
    let audios = document.querySelectorAll('audio');
    console.log('reproduciendo ' + nombre);
    for(let aud of audios){
      aud.pause();
      aud.currentTime = 0;
    }
    soundsList[nombre].play();
}

function playFX(nombre){
    soundsList[nombre].pause();
    soundsList[nombre].currentTime = 0;
    soundsList[nombre].play();
}
