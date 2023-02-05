//framerate stuff

var fps = 60;
var now;
var then = Date.now();
var interval = 1000/fps;
var delta;

//updates the canvas elements based on input and calls itself || core gameplay loop

function animate() {

	requestAnimationFrame(animate);

	now = Date.now();
    delta = now - then;
     
    if (delta > interval) {

		if(gamePaused) {
			cancelAnimationFrame(animate);

            clearTimeout(playerDelay);
            clearTimeout(enemyDelay);
            clearTimeout(playerSplash);
            clearTimeout(enemySplash);

			return;
		}

        // update time stuffs
         
        // Just `then = now` is not enough.
        // Lets say we set fps at 10 which means
        // each frame must take 100ms
        // Now frame executes in 16ms (60fps) so
        // the loop iterates 7 times (16*7 = 112ms) until
        // delta > interval === true
        // Eventually this lowers down the FPS as
        // 112*10 = 1120ms (NOT 1000ms).
        // So we have to get rid of that extra 12ms
        // by subtracting delta (112) % interval (100).
        // Hope that makes sense.
         
        then = now - (delta % interval);
         
        // ... Code for Drawing the Frame ...
		
		controllerInput();
		
		// needed to assess which side should characters face

		//background fill
		//ctx.fillStyle = 'black';
		//ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(bg, 0,0);

		posCalc();

		//resets characters' speed when they aren't moving
		player.v.x = 0;
		enemy.v.x = 0;

		if(player.isDead){
			player.switchSprite('death');
			player.v.x = 0;
			stopMovement();

		}
		if(enemy.isDead){
			enemy.switchSprite('death');
			enemy.v.x = 0;
			stopMovement()
		}

		//player move
		if(!player.isPunching && !player.isBlocking) {
			if (keys.a.pressed && player.lastKey === 'a') {
				player.v.x = -player.stats.spd;

				player.switchSprite('run');
			} else if (keys.d.pressed && player.lastKey === 'd') {
				player.v.x = player.stats.spd;

				player.switchSprite('run');
			} else {
				player.switchSprite('idle');
			}
		}
		
		if(player.v.y < 0) {
			if (player.isPunching){
				player.switchSprite('attack1');
			} else player.switchSprite('jump');
		} else if(player.v.y > 0) {
			if (player.isPunching){
				player.switchSprite('attack1');
			} else player.switchSprite('fall');
		}


		//enemy move
		if(!enemy.isPunching && !enemy.isBlocking) {
			if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
				enemy.v.x = -enemy.stats.spd;

				enemy.switchSprite('run');
			} else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
				enemy.v.x = enemy.stats.spd;

				enemy.switchSprite('run');
			} else {
				enemy.switchSprite('idle');
			}
		}
		/*
		if (pad.gamepadConnected) {
			if(!enemy.isPunching){
				if(pad.left.Pressed && enemy.lastKey === 'left'){
					enemy.v.x = -enemy.stats.spd;

					enemy.switchSprite('run');
				} else if(pad.right.Pressed && enemy.lastKey === 'right'){
					enemy.v.x = enemy.stats.spd;

					enemy.switchSprite('run');
				} else {
					enemy.switchSprite('idle');
				}
			}
		}
		*/
		if(enemy.v.y < 0) {
			if (enemy.isPunching){
				enemy.switchSprite('attack1');
			} else enemy.switchSprite('jump');
		} else if(enemy.v.y > 0) {
			if (enemy.isPunching){
				enemy.switchSprite('attack1');
			} else enemy.switchSprite('fall');
		}

		//attack punch player
		playerAtt();

		//attack punch enemy
		enemyAtt();

		if(player.stats.hp <= 0 || enemy.stats.hp <=0){

			if(gameOver == false){
				winCheck({player, enemy, timerId});
				gameOver = isGameOver();
			}

		}
		drawHpBars();
	}
}

// sounds from www.freesound.org