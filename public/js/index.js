let player = document.querySelector('audio');
let play = document.querySelector('#play');
let pause = document.querySelector('#pause');
let forward = document.querySelector('#forward');
let back = document.querySelector('#back');
let progress = document.querySelector('.progress');
let volume = document.querySelector('#volume');
let volumeslider = document.getElementById("volumeslider");

function togglePlayAndPause() {
    play.classList.toggle('hide');
    pause.classList.toggle('hide');
}

play.addEventListener('click', () => {
    player.play();
    togglePlayAndPause();
});

pause.addEventListener('click', () => {
    player.pause();
    togglePlayAndPause();
});

forward.addEventListener('click', () => {
    player.currentTime += 10;
});

back.addEventListener('click', () => {
    player.currentTime -= 10;
});

player.addEventListener('timeupdate', function() {
    let width = (player.currentTime / player.duration) * 100;
    progress.style.width = Math.floor(width) + '%';
});

//const songMinutes = Math.floor(audio.duration / 60);
//const songSeconds = Math.floor(audio.duration - songMinutes * 60);

player.addEventListener('ended', () => {
    progress.style.width = 0;
    player.loop;
    play.classList.toggle('hide');
    pause.classList.toggle('hide');
});

volume.addEventListener('click', () => {
    volumeslider.classList.toggle('hidden');
});

volumeslider.oninput = function() {
    player.volume = this.value / 100;
    if (this.value == 0) {
        volume.classList = 'fa fa-volume-off';
    } else if (this.value < 50) {
        volume.classList = 'fa fa-volume-down';
    } else {
        volume.classList = 'fa fa-volume-up';
    }
    volumeslider.style.background = 'linear-gradient(90deg, #1c1b44, #1c1b44 ' + this.value + '%, #f0f0f0 ' + this.value + '%, #f0f0f0 50%)';
}