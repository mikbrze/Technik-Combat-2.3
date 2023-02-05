class Sprite {
    constructor({
        pos,
        size,
        imageSrcL,
        imageSrcR,
        scale = 1,
        framesMax = 1,
        framesHold = 0,
        framesCurrent = 0,
        framesElapsed = 0,
        framesStop,
        offset = {x:0, y:0} 
    }) {
        this.pos = pos;
        this.size = size;

        this.imageL = new Image();
        this.imageR = new Image();
        this.imageL.src = imageSrcL;
        this.imageR.src = imageSrcR;

        this.scale = scale;
        this.offset = offset;
        
        this.framesMax = framesMax;
        this.framesCurrent = framesCurrent;
        this.framesElapsed = framesElapsed;
        this.framesHold = framesHold;
    }
  
    drawLeft() {
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

    drawRight() {
        ctx.drawImage(
          this.imageR,
          this.framesCurrent * (this.imageR.width / this.framesMax),
          0,
          this.imageR.width / this.framesMax,
          this.imageR.height,
          this.pos.x -this.offset.x,
          this.pos.y -this.offset.y,
          (this.imageR.width / this.framesMax) * this.scale,
          this.imageR.height * this.scale
        )
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
    
    updateLeft() {
        this.drawLeft();
        this.animateFrames();
    }

    updateRight() {
        this.drawLeft();
        this.animateFrames();
    }
}