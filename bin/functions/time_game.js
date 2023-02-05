//timer stuff
var gameOver = false;

let time = 60;
let timerId;

function isGameOver(){
	return true;
}

function winCheck({player, enemy, timerId}) {

	clearTimeout(timerId);
	messages.style.display = 'flex';

	if (player.stats.hp === enemy.stats.hp) {
	  messages.innerHTML = 'Draw';
	} else if (player.stats.hp > enemy.stats.hp) {
		if(player.stats.hp === player.maxHp){
			messages.innerHTML = player.charName + ' wins flawlessly';
		} else { 
			messages.innerHTML = player.charName + ' wins';
		}
	} else if (player.stats.hp < enemy.stats.hp) {
		if(enemy.stats.hp === enemy.maxHp){
			messages.innerHTML = enemy.charName + ' wins flawlessly';
		} else { 
			messages.innerHTML = enemy.charName + ' wins';
		}
	}
  }

function timeDec() {
	if (time === 0) {
		gameOver = true;
		stopMovement();
		winCheck({player, enemy, timerId});
	}
 	if (time > 0) {
    timerId = setTimeout(timeDec, 1000);
	if(!gamePaused){
		time--;
    	document.querySelector('#timer').innerHTML = time;
	}
  }
}

function UpdatePlayerData() {
    let icons = document.querySelectorAll('.icon');
    let playerName = document.querySelectorAll('.playerName');

    var playerIcon = new Image;
    playerIcon.src = player.icon.iconSrcL;
    icons.item(0).appendChild(playerIcon);

    var enemyIcon = new Image;
    enemyIcon.src = enemy.icon.iconSrcR;
    icons.item(1).appendChild(enemyIcon);

    playerName.item(0).innerHTML = player.charName;
    playerName.item(1).innerHTML = enemy.charName;
}

function stopMovement(){
	keys.a.pressed = false;
	keys.d.pressed = false;
	keys.ArrowLeft.pressed = false;
	keys.ArrowRight.pressed = false;
}

function clearKeys(){
	for(let el of keys){
		el.pressed = false
	}
}