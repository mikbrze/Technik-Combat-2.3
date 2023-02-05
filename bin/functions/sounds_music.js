let fighting = new Audio("assets/music/fight.mp3");
fighting.loop = 'true'
fighting.autoplay = 'true';

document.addEventListener('DOMContentLoaded', loadVolumeOptions)

fighting.addEventListener('canplaythrough', ()=>{
	fighting.play();
	window.addEventListener('keydown', ()=>{
		if(fighting.paused){
			fighting.play();
		}
	})
})

musicVolume.addEventListener('change', saveVolumeOptions)

function saveVolumeOptions(){
    let changedMusicVol = musicVolume.value
    fighting.volume = musicVolume.value / 100;
    localStorage.setItem('gameMusicVolume', changedMusicVol);
}

function loadVolumeOptions(){
    let savedMusicVol = localStorage.getItem('gameMusicVolume');
    if(savedMusicVol !== null){
        musicVolume.value = savedMusicVol;
        fighting.volume = savedMusicVol / 100
    }
    else{
        musicVolume.value = 30;
        fighting.volume = 0.3
    }
}