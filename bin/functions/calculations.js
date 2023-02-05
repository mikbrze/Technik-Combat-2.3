//this function checks who did combo and increments its value

var playerDelay;
var enemyDelay;
var playerSplash;
var enemySplash;

function comboCounter(who, target, val, timeout){

        let combo = document.querySelector(`#${who}Combo`);

            combo.innerHTML = '';
            combo.style.color = '';
            combo.style.fontSize = '30px';

            clearTimeout(window[`${who}Splash`]);

                target.inCombo = true;
                target.comboCount = target.comboCount + val;
                combo.innerHTML = 'Combo: ' + target.comboCount;

            clearTimeout(window[`${who}Delay`]);

            if (target.inCombo == true) {

                    window[`${who}Delay`] = setTimeout(function() {
                    target.inCombo = false;
                    combo.innerHTML = '';

                    comboType(target, combo, who);

                    target.comboCount = 0;

                }, timeout);
            }
};

function comboType(target, combo, who) {

    const splashes = {

        c1: 'Double',
        c2: 'Triple ',
        c3: 'Solid',
        c4: 'Brutal',
        c5: 'Extreme!',
        c6: 'CRAZY!'

    };

if (target.comboCount == 2) {

    combo.innerHTML = splashes.c1;
    combo.style.color = '#FFDB00';
    combo.style.fontSize = '32px';

}

if (target.comboCount == 3) {

    combo.innerHTML = splashes.c2;
    combo.style.color = '#F8BA09';
    combo.style.fontSize = '34px';

}

if (target.comboCount == 4) {

    combo.innerHTML = splashes.c3;
    combo.style.color = '#F19A11';
    combo.style.fontSize = '36px';

}

if (target.comboCount >= 5) {

    combo.innerHTML = splashes.c4;
    combo.style.color = '#E9791A';
    combo.style.fontSize = '38px';

}

if (target.comboCount >= 8) {

    combo.innerHTML = splashes.c5;
    combo.style.color = '#E25822';
    combo.style.fontSize = '40px';

}

if (target.comboCount >= 10) {

    combo.innerHTML = splashes.c6;
    combo.style.color = 'tomato';
    combo.style.letterSpacing = '4px';
    combo.style.fontSize = '42px';

}

    window[`${who}Splash`] = setTimeout(() => {
    
        combo.innerHTML = ''
        combo.style.color = 'pink';
        combo.style.fontSize = '30px';

    }, 2000);

};

//changes hitboxes positions - right char
function drawAttRight(target){
	target.attackBoxPunch.pos.x = target.pos.x + target.size.width + -target.attackBoxPunch.size.width;
	target.attackBoxPunch.pos.y = target.pos.y;
}

//changes hitboxes positions - left char
function drawAttLeft(target){
	target.attackBoxPunch.pos.x = target.pos.x;
    target.attackBoxPunch.pos.y = target.pos.y;

}

function drawBlockRight(target){
    if(target.isBlocking){
    target.blockBoxUp.pos.x = target.pos.x - target.blocks.up.size.width;
    target.blockBoxUp.pos.y = target.pos.y;
    } else {
        target.blockBoxUp.pos.x = 0;
        target.blockBoxUp.pos.y = 0;
    }
}

function drawBlockLeft(target){
    if(target.isBlocking){
        target.blockBoxUp.pos.x = target.pos.x + target.size.width;
        target.blockBoxUp.pos.y = target.pos.y;
    } else {
        target.blockBoxUp.pos.x = 0;
        target.blockBoxUp.pos.y = 0;
    }
}

//calcs which character is the leftmost
function posCalc(){
    if(player.pos.x > enemy.pos.x){
        if(!player.isBlocking){
            drawAttRight(player);
            drawBlockRight(player);
            player.updateRight();
            player.currentSide = 'Right';
        } else {
            if(player.currentSide === 'Right'){
                drawAttRight(player);
                drawBlockRight(player);
                player.updateRight();
                player.currentSide = 'Right';
            } else {
                drawAttLeft(player);
                drawBlockLeft(player);
                player.updateLeft();
                player.currentSide = 'Left';
            }
        }
        if(!enemy.isBlocking){
            drawAttLeft(enemy);
            drawBlockLeft(enemy);
            enemy.updateLeft();
            enemy.currentSide = 'Left';
        } else {
            if(enemy.currentSide === 'Right'){
                drawAttRight(enemy);
                drawBlockRight(enemy);
                enemy.updateRight();
                enemy.currentSide = 'Right';
            } else {
                drawAttLeft(enemy);
                drawBlockLeft(enemy);
                enemy.updateLeft();
                enemy.currentSide = 'Left';
            }
        }

    }
	else {
        if(!player.isBlocking){
            drawAttLeft(player);
            drawBlockLeft(player)
            player.updateLeft();
            player.currentSide = 'Left';
        } else {
            if(player.currentSide === 'Right'){
                drawAttRight(player);
                drawBlockRight(player);
                player.updateRight();
                player.currentSide = 'Right';
            } else {
                drawAttLeft(player);
                drawBlockLeft(player)
                player.updateLeft();
                player.currentSide = 'Left';
            }
        }
        
        if(!enemy.isBlocking){
            drawAttRight(enemy);
            drawBlockRight(enemy);
            enemy.updateRight();
            enemy.currentSide = 'Right';
        } else {
            if(enemy.currentSide === 'Right'){
                drawAttRight(enemy);
                drawBlockRight(enemy);
                enemy.updateRight();
                enemy.currentSide = 'Right';
            } else {
                drawAttLeft(enemy);
                drawBlockLeft(enemy);
                enemy.updateLeft();
                enemy.currentSide = 'Left';
            }
        }
	}
};
//returns true if rectangle1's attacks hit rectangle2
function collisonPunch({rectangle1, rectangle2,}) {
	return (
		rectangle1.pos.x + rectangle1.size.width >= rectangle2.pos.x &&
		rectangle1.pos.x <= rectangle2.pos.x + rectangle2.size.width &&
		rectangle1.pos.y + rectangle1.size.height >= rectangle2.pos.y &&
		rectangle1.pos.y <= rectangle2.pos.y + rectangle2.size.height
		)
}

async function playerAtt(){
    if (
        collisonPunch({
            rectangle1: player.attackBoxPunch,
            rectangle2: enemy
        }) && 
        player.isPunching && player.framesCurrent == player.sprites.attack1.framesMax -1
    ) {
        if(
            !collisonPunch({
                rectangle1: player.attackBoxPunch,
                rectangle2: enemy.blockBoxUp
            }) || player.currentSide == enemy.currentSide){
            player.isPunching = false;

            comboCounter('player', player, 1, 1000);
            enemy.sounds.hit.play();
            hpCalc(player, enemy, 'punch');
            enemy.takeHit();
        }
    }
    if(player.isPunching && player.framesCurrent == player.sprites.attack1.framesMax -1){
        player.isPunching = false;
    } 
}

async function enemyAtt(){
    if (
        collisonPunch({
            rectangle1: enemy.attackBoxPunch,
            rectangle2: player
        }) &&
        enemy.isPunching && enemy.framesCurrent == enemy.sprites.attack1.framesMax -1
    ) {
        if(
            !collisonPunch({
                rectangle1: enemy.attackBoxPunch,
                rectangle2: player.blockBoxUp
            }) || enemy.currentSide == player.currentSide) {
            enemy.isPunching = false;
            
            comboCounter('enemy', enemy, 1, 1000);
            player.sounds.hit.play();
            hpCalc(enemy, player, 'punch');
            player.takeHit();
        }
    }
    if(enemy.isPunching && enemy.framesCurrent == enemy.sprites.attack1.framesMax -1){
        enemy.isPunching = false;
    }
}
//hp substraction and atk dmg function

function hpCalc(attacker, attackee, atkType){
	
	attackee.stats.hp -= attacker.stats.atk * attacker.attacks[atkType].ratio;
	attackee.disHp -= attacker.stats.atk * attacker.attacks[atkType].ratio * 100 / attackee.maxHp;
    if(attackee.stats.hp <= 0){
        attackee.isDead = true;
    }

}

function drawHpBars(){

    //p1's hp
    if(player.disHp < 0) gsap.to('#playerHp', {

        width: 0 + '%'

    });


    else gsap.to('#playerHp', {

        width: player.disHp + '%'

    });

    //p2's hp
    if(enemy.disHp < 0) gsap.to('#enemyHp', {

        width: 0 + '%'

    });


    else gsap.to('#enemyHp', {

        width: enemy.disHp + '%'

    });
}