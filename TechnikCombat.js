//canva selector and gravity etc
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1366;
canvas.height = 768;

const ground = 60;
var grav = 0.4;
const comboTimeout = 1500;

//textures and music

const bg = new Image();
bg.src = "assets/gui/bg1.png";

/*
	characters - | pos is position | v is speed | size is self-explainatory | stats are self-explainatory |
	attacks ratio is the used to calculate damage based on characters'att
*/

const P1 = {
	name: 'Player 1',
	pos: {
		x: 0,
		y: 0
	},
	v: {
		x: 0,
		y: 0
	},
	size: {
		width: 94,
		height: 165
	},
	stats: {
		spd: 5,
		atk: 10,
		hp: 100,
		jmpHt: 13
	},
	attacks: {
		punch: {
			ratio: 1,
			width: 300,
			height: 100,
		}
	},
	blocks:{
		up: {
			size:{
				width: 40,
				height: 60
			}
		},
		down:{

		}
	},
	imageSrcL: "assets/sprite/samurai1/L/Idle.png",
	imageSrcR: "assets/sprite/samurai1/R/Idle.png",
	scaleL: 3,
	scaleR: -3,
	scale: 3,
	framesMax: 8,
	framesHold: 10,
	offset: {
		x: 250,
		y: 200
	},
	offsetL: {
		x: 250,
		y: 200
	},
	icon:{
		iconSrcL: "assets/icons/samurai1/icon_red_L.png"
	},
	sprites: {
		idle: {
			imageSrcL: "assets/sprite/samurai1/L/Idle.png",
			imageSrcR: "assets/sprite/samurai1/R/Idle.png",

			framesMax: 8,
			framesHold: 10,
			framesStop: false
		},
		run: {
			imageSrcL: "assets/sprite/samurai1/L/Run.png",
			imageSrcR: "assets/sprite/samurai1/R/Run.png",

			framesMax: 8,
			framesHold: 10,
			framesStop: false
		},
		jump: {
			imageSrcL: "assets/sprite/samurai1/L/Jump.png",
			imageSrcR: "assets/sprite/samurai1/R/Jump.png",

			framesMax: 2,
			framesHold: 10,
			framesStop: false
		},
		fall: {
			imageSrcL: "assets/sprite/samurai1/L/Fall.png",
			imageSrcR: "assets/sprite/samurai1/R/Fall.png",

			framesMax: 2,
			framesHold: 10,
			framesStop: false
		},
		attack1: {
			imageSrcL: "assets/sprite/samurai1/L/Attack1.png",
			imageSrcR: "assets/sprite/samurai1/R/Attack1.png",

			framesMax: 6,
			framesHold: 4,
			framesStop: false
		},
		block: {
			imageSrcL: "assets/sprite/samurai1/L/Block.png",
			imageSrcR: "assets/sprite/samurai1/R/Block.png",

			framesMax: 6,
			framesHold: 3,
			framesStop: true
		},
		takeHit: {
			imageSrcL: "assets/sprite/samurai1/L/TakeHit.png",
			imageSrcR: "assets/sprite/samurai1/R/TakeHit.png",

			framesMax: 4,
			framesHold: 3,
			framesStop: false
		},
		death: {
			imageSrcL: "assets/sprite/samurai1/L/Death.png",
			imageSrcR: "assets/sprite/samurai1/R/Death.png",

			framesMax: 6,
			framesHold: 10,
			framesStop: true
		}
	},
	sounds: {
		slash: new Audio ("assets/sound/slash.wav"),
		jump:  new Audio ("assets/sound/jump.wav"),
		hit: new Audio ("assets/sound/hit.mp3"),
		death: new Audio("assets/sound/death.mp3")
	}
}

const P2 = {
	name: 'Player 2',
	pos: {
		x: 0,
		y: 0
	},
	v: {
		x: 0,
		y: 0
	},
	size: {
		width: 94,
		height: 165
	},
	stats: {
		spd: 5,
		atk: 10,
		hp: 100,
		jmpHt: 13
	},
	attacks: {
		punch: {
			ratio: 1,
			width: 300,
			height: 100,
		}
	},
	blocks:{
		up: {
			size:{
				width: 40,
				height: 60
			}
		},
		down:{

		}
	},
	imageSrcL: "assets/sprite/samurai2/L/Idle.png",
	imageSrcR: "assets/sprite/samurai2/R/Idle.png",
	scaleL: 3,
	scaleR: -3,
	scale: 3,
	framesMax: 8,
	framesHold: 10,
	offset: {
		x: 250,
		y: 200
	},
	offsetL: {
		x: 250,
		y: 200
	},
	offsetR:{
		x: -250 -94 -6, //negated -hitbox width -6 (idk what is -6)
		y: -400 //negated hitbox *2
	},
	icon: {
		iconSrcR: "assets/icons/samurai2/icon_blue_R.png"
	},
	sprites: {
		idle: {
			imageSrcL: "assets/sprite/samurai2/L/Idle.png",
			imageSrcR: "assets/sprite/samurai2/R/Idle.png",

			framesMax: 8,
			framesHold: 10,
			framesStop: false
		},
		run: {
			imageSrcL: "assets/sprite/samurai2/L/Run.png",
			imageSrcR: "assets/sprite/samurai2/R/Run.png",

			framesMax: 8,
			framesHold: 10,
			framesStop: false
		},
		jump: {
			imageSrcL: "assets/sprite/samurai2/L/Jump.png",
			imageSrcR: "assets/sprite/samurai2/R/Jump.png",

			framesMax: 2,
			framesHold: 10,
			framesStop: false
		},
		fall: {
			imageSrcL: "assets/sprite/samurai2/L/Fall.png",
			imageSrcR: "assets/sprite/samurai2/R/Fall.png",

			framesMax: 2,
			framesHold: 10,
			framesStop: false
		},
		attack1: {
			imageSrcL: "assets/sprite/samurai2/L/Attack1.png",
			imageSrcR: "assets/sprite/samurai2/R/Attack1.png",

			framesMax: 6,
			framesHold: 4,
			framesStop: false
		},
		block:{
			imageSrcL: "assets/sprite/samurai2/L/Block.png",
			imageSrcR: "assets/sprite/samurai2/R/Block.png",

			framesMax: 6,
			framesHold: 3,
			framesStop: true
		},
		takeHit: {
			imageSrcL: "assets/sprite/samurai2/L/Take Hit.png",
			imageSrcR: "assets/sprite/samurai2/R/Take Hit.png",

			framesMax: 4,
			framesHold: 3,
			framesStop: false
		},
		death: {
			imageSrcL: "assets/sprite/samurai2/L/Death.png",
			imageSrcR: "assets/sprite/samurai2/R/Death.png",

			framesMax: 6,
			framesHold: 10,
			framesStop: true
		}
	},
	sounds: {
		slash: new Audio("assets/sound/slash.wav"),
		jump:  new Audio("assets/sound/jump.wav"),
		hit: new Audio("assets/sound/hit.mp3"),
		death: new Audio("assets/sound/death.mp3")
	}
}

//creating P1 and P2 || see characters section to learn about their stats
const player = new Fighter(P1);
const enemy = new Fighter(P2);

player.pos.x = 0 + player.size.width;
player.pos.y = canvas.height - player.size.height - ground;

enemy.pos.x = canvas.width - enemy.size.width * 2;
enemy.pos.y = canvas.height - enemy.size.height - ground;

//Initialize names and icons
UpdatePlayerData();

//object tracking if a key is pressed, used in movement events
const keys = {
	ArrowLeft: {
		pressed: false
	},
	ArrowRight: {
		pressed: false
	},
	a: {
		pressed: false
	},
	d: {
		pressed: false
	}
}

let pad = {

	controllerIndex: null,
	gamepadConnected: null,
	left: { Pressed: false },
	right: { Pressed: false },
	up: { Pressed: false },
	down: { Pressed: false },
	a: { Pressed: false },
	b: { Pressed:  false },
	x: { Pressed: false },
	y: { Pressed: false }
};

timeDec();

//first calling of the animate function which starts the gameplay loop
bg.addEventListener('load', animate);

//player and enemy controls
window.addEventListener('keydown', (e) => {
	if(e.key === 'p' || e.key === 'P'){
		switch (gamePaused) {
		case false:
			gamePaused = true;
			musicVolume.style.display = 'inline-block';
			pauseScreen.style.display = 'block';
			
			messages.style.fontSize = "100px"
			messages.innerHTML = "paused";
			messages.style.display = 'flex';

			clearKeys();

			break;
		case true:
			gamePaused = false;
			musicVolume.style.display = 'none';
			pauseScreen.style.display = 'none';
			messages.style.fontSize = '58px'
			messages.innerHTML = '';
			messages.style.display = 'none';

			clearKeys();

			setTimeout(() => {
				let combo1 = document.querySelector('#playerCombo');
				let combo2 = document.querySelector('#enemyCombo');
				
				combo1.innerHTML = ''
				combo1.style.color = 'gainsboro';
				combo1.style.fontSize = '30px';

				combo2.innerHTML = ''
				combo2.style.color = 'gainsboro';
				combo2.style.fontSize = '30px';
				
				player.comboCount = 0;
				enemy.comboCount = 0;
		
			}, 1000);
			
			break;
		}

	}
	if(player.isDead || enemy.isDead) return;
	if(gameOver) return;
	if(gamePaused) return;
		switch (e.key){
			//P1
			case 'a':
			case 'A':
				keys.a.pressed = true;
				player.lastKey = 'a'
				break;

			case 'd':
			case 'D':
				keys.d.pressed = true;
				player.lastKey = 'd'
				break;

			case 'w':
			case 'W':
				if (player.isJumping || player.isBlocking || player.isHit) return;
				player.v.y = -player.stats.jmpHt;
				player.isJumping = true;
				player.sounds.jump.play();
				break;
			case 'j':
			case 'J':
				player.block();
				break;

			//P2
			case 'ArrowLeft':
				keys.ArrowLeft.pressed = true;
				enemy.lastKey = 'ArrowLeft'
				break;

			case 'ArrowRight':
				keys.ArrowRight.pressed = true;
				enemy.lastKey = 'ArrowRight'
				break;

			case 'ArrowUp':
				if (enemy.isJumping || player.isBlocking || enemy.isHit) return;
				enemy.v.y = -enemy.stats.jmpHt;
				enemy.isJumping = true;
				enemy.sounds.jump.play();
				break;
			case '1':
				enemy.block()
				break;
		}
});

//keyup events for resetting speed
window.addEventListener('keyup', (e) => {
	if(player.isDead || enemy.isDead) return;
	if(gameOver) return;
	if(gamePaused) return;
	//high priority - blocks 1st if for player 2nd for enemy

	if(e.key == 'j' || e.key == 'J'){

		player.clearBlock()

	}
	if (e.key == '1'){

		enemy.clearBlock();

	} 
	switch (e.key){
		
		//P1
		case 'a':
		case 'A':
			keys.a.pressed = false;
			break;

		case 'd':
		case 'D':
			keys.d.pressed = false;
			break;
		case 'h':
		case 'H':	
			player.punch();
			break;			

		//P2
		case 'ArrowLeft':
			keys.ArrowLeft.pressed = false;
			break;
		case 'ArrowRight':
			keys.ArrowRight.pressed = false;
			break;
		case '0':
			enemy.punch()
			break;
		//devMode
		case '`':
			if(!player.devMode && !enemy.devMode){
				player.devMode = true;
				enemy.devMode = true;
			} else {
				player.devMode = false;
				enemy.devMode = false;
			}
			break;
	}
});

//Entire gamepad functionality

//Gamepad connected event listener
window.addEventListener("gamepadconnected", (event) => {
 pad.controllerIndex = event.gamepad.index;
 console.log("gamepad connected")
 pad.gamepadConnected = true;
});
//Gamepad disconnected event listener
window.addEventListener("gamepaddisconnected", (event) => {
 console.log("disconnected gamepad")
 pad.controllerIndex = null;
 pad.gamepadConnected = false;
});


//Gamepad inputs read
function controllerInput(){
 if(pad.controllerIndex !== null){
   const gamepad = navigator.getGamepads()[pad.controllerIndex]
   const buttons = gamepad.buttons;

   //Dpad functionality
   pad.up.Pressed = buttons[12].pressed;
   pad.down.Pressed = buttons[13].pressed;
   pad.left.Pressed = buttons[14].pressed;
   pad.right.Pressed = buttons[15].pressed;

   //Axes functionality
   const stickDeadZone = 0.4;
   const leftRightValue = gamepad.axes[0];

   if(leftRightValue >= stickDeadZone){
	   pad.right.Pressed = true;
   }
   else if ( leftRightValue <= -stickDeadZone){
	   pad.left.Pressed = true;
   }

   const upDownValue = gamepad.axes[1];
   if(upDownValue >= stickDeadZone){
	   pad.down.Pressed = true;
   }
   else if(upDownValue <= -stickDeadZone){
	   pad.up.Pressed = true;
   }

   //Abxy functionality
   pad.a.Pressed = buttons[0].pressed;
   pad.b.Pressed = buttons[1].pressed;
   pad.x.Pressed = buttons[2].pressed;
   pad.y.Pressed = buttons[3].pressed;
   
   movement();
 }
};

function movement(){

	if (pad.left.Pressed){
		enemy.lastKey = 'left';
	}
	if (pad.right.Pressed){
		enemy.lastKey = 'right';
	}
	if (pad.up.Pressed){
		if (enemy.isJumping) return;
			jump2.play();
			enemy.v.y = -enemy.stats.jmpHt;
			enemy.isJumping = true;
	}
	if (pad.x.Pressed){
		punchCd(enemy);
	}
}