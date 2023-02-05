class Sprite2 {
    constructor({
        pos,
        posR,
        size,
        imageSrcL,
        imageSrcR,
        scale = 1,
        framesMax = 1,
        framesHold = 0,
        framesCurrent = 0,
        framesElapsed = 0,
        framesStop,
        offset = {x:0, y:0},
        offsetL,
        offsetR,
        currentSide
    }) {
        this.pos = pos;
        this.posR = {
          x: -this.pos.x,
          y: this.pos.y
        };
        this.size = size;

        this.imageL = new Image();
        this.imageL.src = imageSrcL;

        this.scale = scale;
        this.offset = offset;

        this.offsetL = offsetL;
        this.offsetR = offsetR;

        this.framesMax = framesMax;
        this.framesCurrent = framesCurrent;
        this.framesElapsed = framesElapsed;
        this.framesHold = framesHold;

        this.currentSide = currentSide
    }
  
    draw() {
      if(this.currentSide == "Left"){
      ctx.drawImage(
        this.imageL,
        this.framesCurrent * (this.imageL.width / this.framesMax),
        0,
        this.imageL.width / this.framesMax,
        this.imageL.height,
        this.pos.x -this.offset.x,
        this.pos.y -this.offset.y,
        (this.imageL.width / this.framesMax) * this.scale,
        this.imageL.height * this.scale
      )
    }
    else {
      ctx.drawImage(
        this.imageL,
        this.framesCurrent * (this.imageL.width / this.framesMax),
        0,
        this.imageL.width / this.framesMax,
        this.imageL.height,
        this.posR.x - this.offset.x,
        this.posR.y - this.offset.y,
        (this.imageL.width / this.framesMax) * this.scale,
        this.imageL.height * this.scale
      )
    }
    }
    animateFrames() {
      this.framesElapsed++;
      if(this.framesStop){
        if (this.framesElapsed % this.framesHold === 0) {
          if (this.framesCurrent < this.framesMax - 1) {
              this.framesCurrent++
            } else {
                this.framesCurrent = this.framesMax - 1
              }
          }
      }
      else {
        if (this.framesElapsed % this.framesHold === 0) {
          if (this.framesCurrent < this.framesMax - 1) {
              this.framesCurrent++
            } else {
                this.framesCurrent = 0
              }
          }
      }
    }
    
    update() {
        this.draw();
        this.animateFrames();
    }
}