// ? get elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// ? build out functions

// toggle play
function togglePlay() {
    if(video.paused){
        video.play();
    } else {
        video.pause();
    }
}

 // change play button
 function updatePlayButton() {
    const icon = this.paused ? '▶':'❚❚';
    toggle.textContent = icon;
 }

// skip video
function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

// handle update volume and play rate
function handleRangeUpdate() {
    video[this.name] = this.value;
}

// handle progess
function handleProgress() {
    const precent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${precent}%`;
}

// scrub video
function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

// ? hook up the event listeners

video.addEventListener('click', togglePlay);
video.addEventListener('play', updatePlayButton);
video.addEventListener('pause', updatePlayButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => {
    button.addEventListener('click', skip);
});

ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpdate);
    // range.addEventListener('mousemove', handleRangeUpade);
});

let mouseDown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mouseDown && scrub(e));
progress.addEventListener('mousedown', () => mouseDown = true);
progress.addEventListener('mouseup', () => mouseDown = false);