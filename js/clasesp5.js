//Clases de p5. Todas estas clases interactúan con funciones de p5, así que
//necesitan que exista una instancia de p5 (en instance mode al menos) para vincular
// todas las funciones de p5 a ella.
// Para pasar estas clases a modo global simplemente eliminar todos los "p."


class Particula{
  constructor(x,y,velX,velY){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.size = 20;
  }
  update(){
    this.x += this.velX;
    this.y += this.velY;
    if(this.x >= p.width || this.x <= 0){
      this.velX *= -1;
    }
    if(this.y >= p.height || this.y <= 0){
      this.velY *= -1;
    }
  }
}

class ParticulaAutonoma extends Particula {
  constructor(x,y,velX,velY){
    super(x,y,velX,velY);
  }
  update(){
    super.update();
    this.velX += p.random(-0.3,0.3);
    this.velY += p.random(-0.3,0.3);
    if (this.velX > velocidadMaxEnemigos){
      this.velX = velocidadMaxEnemigos;
    }
    else if (this.velX < -velocidadMaxEnemigos){
      this.velX = -velocidadMaxEnemigos;
    }
    if (this.velY > velocidadMaxEnemigos){
      this.velY = velocidadMaxEnemigos;
    }
    else if (this.velY < -velocidadMaxEnemigos){
      this.velY = -velocidadMaxEnemigos;
    }
  }
}

class Chaser extends ParticulaAutonoma {
  constructor(x,y,velX,velY, sprite){
    super(x,y,velX,velY);
    this.sprite = sprite; //placeholder que puede o no ser inicializado en el sketch
    if (this.sprite){
      this.v = p.createVector(velX, velY); //Vector usado SOLO para angulo sprite (por ahora)
      this.previousV = p.createVector(velX, velY); //Vector auxiliar para interpolar movimiento
      this.lerpV = p.createVector(velX, velY); //Este va a ser el vector usado en el render del sprite
    }
  }
  update(){
    super.update();
    if(this.sprite){
      if(Math.abs(this.velX) > 0 || Math.abs(this.velY) > 0){
        this.previousV.x = this.v.x;
        this.previousV.y = this.v.y;
        this.v.x = this.velX;
        this.v.y = this.velY;
      }
    }
  }
  render(){
    p.push();
    // p.stroke(0,20,20+(Math.abs(this.velX)+Math.abs(this.velY))*20 * 4/velocidadMaxEnemigos);
    // p.noFill();
    // p.ellipse(this.x, this.y, this.size, this.size);
    if(this.sprite){
      //Renderizar sprite
      p.translate(this.x, this.y);
      p.imageMode(p.CENTER);
      this.lerpV = p5.Vector.lerp(this.previousV, this.v, 0.5);
      if(this.v.mag() > 2){
        p.rotate(this.v.heading() + p.radians(90));
      }
      else{
        p.rotate(this.lerpV.heading() + p.radians(90));
      }
      p.image(this.sprite, 0, 0);
    }
    p.pop();
  }
}

class Food extends ParticulaAutonoma{
  constructor(x,y,velX,velY, sprite){
    super(x,y,velX,velY);
    this.sprite = sprite; //placeholder que puede o no ser inicializado en el sketch
    if (this.sprite){
      this.v = p.createVector(velX, velY); //Vector usado SOLO para angulo sprite (por ahora)
      this.previousV = p.createVector(velX, velY); //Vector auxiliar para interpolar movimiento
      this.lerpV = p.createVector(velX, velY); //Este va a ser el vector usado en el render del sprite
    }
  }
  update(){
    super.update();
    if(this.sprite){
      if(Math.abs(this.velX) > 0 || Math.abs(this.velY) > 0){
        this.previousV.x = this.v.x;
        this.previousV.y = this.v.y;
        this.v.x = this.velX;
        this.v.y = this.velY;
      }
    }
  }
  render(){
    p.push();
    // p.stroke(60,180,210);
    // p.noFill();
    // p.ellipse(this.x, this.y, 20, 20);
    if(this.sprite){
      //Renderizar sprite
      p.translate(this.x, this.y);
      p.imageMode(p.CENTER);
      this.lerpV = p5.Vector.lerp(this.previousV, this.v, 0.5);
      if(this.v.mag() > 2){
        p.rotate(this.v.heading() + p.radians(90));
      }
      else{
        p.rotate(this.lerpV.heading() + p.radians(90));
      }
      p.image(this.sprite, 0, 0);
    }
    p.pop();
  }
}

class Jugador extends Particula {
  constructor(x,y,velX,velY,sprite){
    super(x,y,velX,velY);
    this.sprite = sprite; //placeholder que puede o no ser inicializado en el sketch
    if (this.sprite){
      this.v = p.createVector(velX, velY); //Vector usado SOLO para angulo sprite (por ahora)
      this.previousV = p.createVector(velX, velY); //Vector auxiliar para interpolar movimiento
      this.lerpV = p.createVector(velX, velY); //Este va a ser el vector usado en el render del sprite
    }
  }
  updateToMouse(mouseX, mouseY){
    this.x += this.velX;
    this.y += this.velY;
    this.velX = p.mouseX - this.x;
    this.velY = p.mouseY - this.y;
    if ( this.x < 0 ){
      this.x = 0;
    }
    else if ( this.x > p.width ){
      this.x = p.width;
    }
    if ( this.y < 0 ){
      this.y = 0;
    }
    else if ( this.y > p.height ){
      this.y = p.height;
    }
    if(this.sprite){
      if(Math.abs(this.velX) > 0 || Math.abs(this.velY) > 0){
        this.previousV.x = this.v.x;
        this.previousV.y = this.v.y;
        this.v.x = this.velX;
        this.v.y = this.velY;
      }
    }
    //Colisiones
    for (var i = 0; i < chasers.length; i++) {
      if(this.x - chasers[i].x < 15 && this.x - chasers[i].x > -15){
        if(this.y - chasers[i].y < 15 && this.y - chasers[i].y > -15){
        p.background(255,0,0);
        chasers[i].x = p.random(0, p.width);
        chasers[i].y = p.random(0, p.height);
        actualizarVida(vida - dañoEnemigo);
        }
      }
    }
    for (var i = 0; i < comidas.length; i++) {
      if(this.x - comidas[i].x < 15 && this.x - comidas[i].x > -25){
        if(this.y - comidas[i].y < 15 && this.y - comidas[i].y > -25){
        p.background(rgba(255,255,255,0.2));
        comidas[i].x = p.random(0, p.width);
        comidas[i].y = p.random(0, p.height);
        actualizarVida(vida + recuperaciónPorComida);
        actualizarPuntaje(puntaje + 1);
        }
      }
    }
  }
  render(){
    p.push(); //importante, sobre todo por las transformaciones
    p.stroke(100,100,160);
    // p.strokeWeight(5);
    // p.noFill();
    // p.line(this.x, this.y, p.mouseX, p.mouseY);
    if(this.sprite){
      //Renderizar sprite
      p.translate(this.x, this.y);
      p.imageMode(p.CENTER);
      this.lerpV = p5.Vector.lerp(this.previousV, this.v, 0.5);
      if(this.v.mag() > 2){
        p.rotate(this.v.heading() + p.radians(90));
      }
      else{
        p.rotate(this.lerpV.heading() + p.radians(90));
      }
      p.image(this.sprite, 0, 0);
    }
    p.pop();
  }
}
