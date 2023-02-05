class Fighter extends Sprite {

	constructor({
		name,
		pos,
		v,
		size,
		stats,
		attacks,
		blocks,
		imageSrcL,
		imageSrcR,
		scale = 1,
		framesMax = 1,
		framesHold = 0,
		framesCurrent,
		framesElapsed,
		framesStop,
		offset = {x: 0, y: 0},
		sprites,
		icon,
		sounds
	}) {
		super({
			pos,
			imageSrcL,
			imageSrcR,
			scale,
			framesMax,
			framesCurrent,
			framesElapsed,
			framesHold,
			framesStop,
			offset
		})
		this.charName = name;
		this.stats = stats;

		this.maxHp = this.stats.hp;
		this.disHp = 100;

		this.isJumping = false;
		this.isPunching = false;
		this.isKicking = false;
		this.isBlocking = false;
		this.isHit = false;
		this.isDead = false;

		this.v = v;
		this.size = size;

		this.blocks = blocks;
		this.blockTimeout = null;

		this.attacks = attacks;

		this.lastKey;

		this.currentSide;
		this.sprites = sprites;
		this.icon = icon;

		this.sounds = sounds;

		this.comboCount = 0;
		this.inCombo = false;

		this.devMode = false;

		//adding sprites to object

		for(const sprite in this.sprites){
			sprites[sprite].imageL = new Image();
			sprites[sprite].imageR = new Image();
			sprites[sprite].imageL.src = sprites[sprite].imageSrcL;
			sprites[sprite].imageR.src = sprites[sprite].imageSrcR;
		}

		for(let sound in this.sounds){
			this.sounds[`${sound}`].volume = 0.1;
		}

		this.attackBoxPunch = {
			pos: {
				x: this.pos.x,
				y: this.pos.y
			},
			size:{
				width: this.attacks.punch.width,
				height: this.attacks.punch.height
			}
		};

		this.blockBoxUp = {
			pos:{
				x: 0,
				y: 0
			},
			size:{
				width: 0,
				height: 0
			}
		}
	}

	//changes the isPunching attribute
	punch(){
		if(!this.isBlocking && !this.isHit){
			this.isPunching = true;
			this.switchSprite('attack1');
			this.sounds.slash.play();
		}
	
	}

	block(){
		if(!this.isPunching && !this.isJumping && !this.isHit){

			if(!this.isBlocking){

				this.blockTimeout = setTimeout(()=>{
					this.blockBoxUp.size.width = this.blocks.up.size.width;
					this.blockBoxUp.size.height = this.blocks.up.size.height;
				}, 200);
				
			}
			this.isBlocking = true;
			this.switchSprite('block');
		}	
	}
	clearBlock(){
		this.isBlocking = false;
		this.blockBoxUp.size.width = 0;
		this.blockBoxUp.size.height = 0;
		this.blockTimer = 0;
		clearTimeout(this.blockTimeout);
	}

	takeHit(){
		if(!this.isPunching && this.framesCurrent < this.sprites.attack1.framesMax - 1){
			
			this.isPunching = false;

			if(this.stats.hp > 0) {
				if(!this.isHit){
					this.switchSprite('takeHit');
					this.isHit = true;
				}
			} else {
				this.switchSprite('death');
				this.v.x = 0;
			}
			
		}
	}
	//switching sprites based on string input
	switchSprite(spriteName){
		if (this.imageL === this.sprites.death.imageL) return;
		if (this.imageL === this.sprites.takeHit.imageL && this.framesCurrent <= this.sprites.takeHit.framesMax - 1) {
			if(this.imageL === this.sprites.takeHit.imageL && this.framesCurrent == this.sprites.takeHit.framesMax - 1) this.isHit = false;
			else return
		};
		if (this.imageL === this.sprites.attack1.imageL && this.framesCurrent < this.sprites.attack1.framesMax - 1) return;

		switch (spriteName) {
			case 'death':
				if(this.imageL !== this.sprites.death.imageL){
					this.sounds.death.play();
					this.imageL = this.sprites.death.imageL;
					this.imageR = this.sprites.death.imageR;
					this.framesCurrent = 0;
					this.framesMax = this.sprites.death.framesMax;
					this.framesHold = this.sprites.death.framesHold;
					this.framesStop = this.sprites.death.framesStop;

				}
				break;
			case 'idle':
				if(this.imageL !== this.sprites.idle.imageL){
					this.imageL = this.sprites.idle.imageL;
					this.imageR = this.sprites.idle.imageR;
					this.framesCurrent = 0;
					this.framesMax = this.sprites.idle.framesMax;
					this.framesHold = this.sprites.idle.framesHold;
					this.framesStop = this.sprites.idle.framesStop;
					
				}
				break;
			case 'run':
				if(this.imageL !== this.sprites.run.imageL){
					this.imageL = this.sprites.run.imageL;
					this.imageR = this.sprites.run.imageR;
					this.framesCurrent = 0;
					this.framesMax = this.sprites.run.framesMax;
					this.framesHold = this.sprites.run.framesHold;
					this.framesStop = this.sprites.run.framesStop;
				}
				break;
			case 'jump':
				if(this.imageL !== this.sprites.jump.imageL){
					this.imageL = this.sprites.jump.imageL;
					this.imageR = this.sprites.jump.imageR;
					this.framesCurrent = 0;
					this.framesMax = this.sprites.jump.framesMax;
					this.framesHold = this.sprites.jump.framesHold;
					this.framesStop = this.sprites.jump.framesStop;
				}
				break;
			case 'fall':
				if(this.imageL !== this.sprites.fall.imageL){
					this.imageL = this.sprites.fall.imageL;
					this.imageR = this.sprites.fall.imageR;
					this.framesCurrent = 0;
					this.framesMax = this.sprites.fall.framesMax;
					this.framesHold = this.sprites.fall.framesHold;
					this.framesStop = this.sprites.fall.framesStop;
				}
				break;
			case 'attack1':
				if(this.imageL !== this.sprites.attack1.imageL){
					this.imageL = this.sprites.attack1.imageL;
					this.imageR = this.sprites.attack1.imageR;
					this.framesCurrent = 0;
					this.framesMax = this.sprites.attack1.framesMax;
					this.framesHold = this.sprites.attack1.framesHold;
					this.framesStop = this.sprites.attack1.framesStop;
				}
				break;
			case 'block':
				if(this.imageL !== this.sprites.block.imageL){
					this.imageL = this.sprites.block.imageL;
					this.imageR = this.sprites.block.imageR;
					this.framesCurrent = 0;
					this.framesMax = this.sprites.block.framesMax;
					this.framesHold = this.sprites.block.framesHold;
					this.framesStop = this.sprites.block.framesStop;
				}
				break;
			case 'takeHit':
				if(this.imageL !== this.sprites.takeHit.imageL){
					this.imageL = this.sprites.takeHit.imageL;
					this.imageR = this.sprites.takeHit.imageR;
					this.framesCurrent = 0;
					this.framesMax = this.sprites.takeHit.framesMax;
					this.framesHold = this.sprites.takeHit.framesHold;
					this.framesStop = this.sprites.takeHit.framesStop;

				}
				break;
		
		}
	}

	//updates the position, gravity implementation
	updateLeft() {
		//test
		if(this.devMode){
			ctx.fillStyle = "green";
			ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
			ctx.fillStyle = "blue";
			if (this.isPunching){
				ctx.fillRect(
					this.attackBoxPunch.pos.x, this.attackBoxPunch.pos.y,
					this.attackBoxPunch.size.width, this.attackBoxPunch.size.height
				)
			}
			ctx.fillStyle = "purple";
			if (this.isBlocking){
				console.log('jaja')
				ctx.fillRect(
					this.blockBoxUp.pos.x, this.blockBoxUp.pos.y,
					this.blockBoxUp.size.width, this.blockBoxUp.size.height
				)
			}
		}	
		this.drawLeft();
		this.animateFrames();

		this.newX = this.pos.x + this.v.x
		if(this.newX > 0 && this.newX < canvas.width - player.size.width){
			this.pos.x = this.newX
		}
		this.pos.y += this.v.y;

		if(this.pos.y + this.size.height + this.v.y >= canvas.height - ground){
			this.isJumping = false;
			this.v.y = 0;
		} else this.v.y += grav;


		
	}

	updateRight() {
		//test
		if(this.devMode){
			ctx.fillStyle = "green";
			ctx.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
			ctx.fillStyle = "blue";
			if (this.isPunching){
				ctx.fillRect(
					this.attackBoxPunch.pos.x, this.attackBoxPunch.pos.y,
					this.attackBoxPunch.size.width, this.attackBoxPunch.size.height
				)
			}
			ctx.fillStyle = "purple";
			if (this.isBlocking){
				console.log('jajaaa');
				ctx.fillRect(
					this.blockBoxUp.pos.x, this.blockBoxUp.pos.y,
					this.blockBoxUp.size.width, this.blockBoxUp.size.height
				)
			}
		}	
		this.drawRight();
		this.animateFrames();

		this.newX = this.pos.x + this.v.x
		if(this.newX > 0 && this.newX < canvas.width - player.size.width){
			this.pos.x = this.newX
		}
		this.pos.y += this.v.y;

		if(this.pos.y + this.size.height + this.v.y >= canvas.height - ground){
			this.isJumping = false;
			this.v.y = 0;
		} else this.v.y += grav;
	}
}