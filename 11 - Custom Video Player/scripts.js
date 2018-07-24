/* Get elements */
const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

/*	Build functions */
function togglePlay() {
	if (video.paused)
		video.play();
	else
		video.pause();

	// Alternate method
	// const method = video.paused ? 'play' : 'pause';
  	// video[method]();
}

function updateButton() {
	const icon = this.paused ? '►' : '❚ ❚';
	toggle.textContent = icon;
}

function skip() {
	video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
	if (this.name == "volume")
		video.volume = this.value;
	else if (this.name == "playbackRate")
		console.log(video.playbackRate);

	// Alternate method
	// video[this.name] = this.value;
}

function handleProgress() {
	const percent = video.currentTime / video.duration * 100;
	progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
	const scrubTime = e.offsetX / progress.offsetWidth * video.duration;
	video.currentTime = scrubTime;
}

/* Hook up event listeners */
toggle.addEventListener("click", togglePlay);

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

skipButtons.forEach(button => button.addEventListener("click", skip));

ranges.forEach(range => range.addEventListener("change", handleRangeUpdate));
ranges.forEach(range => range.addEventListener("mousemove", handleRangeUpdate));

let mouseDown = false;
// progressBar.addEventListener("change", handleProgress);
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", () => {
	if (mouseDown)
		scrub();
});
// Alternate method
// progress.addEventListener("mousemove", (e) => mouseDown && scrub(e));
progress.addEventListener("mouseDown", () => mouseDown = true);
progress.addEventListener("mouseUp", () => mouseUp = false);