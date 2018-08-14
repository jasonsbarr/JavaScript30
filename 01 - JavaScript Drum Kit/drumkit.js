const drumKeys = Array.from(document.querySelectorAll('div[data-key]'));
const drumKeyCodes = drumKeys.map(div => +div.dataset.key);

function playDrumKit(e) {
  const code = e.keyCode;
  if (drumKeyCodes.includes(code)) {
    togglePlayingClass(code);

    playAudio(code);
  }
}

function togglePlayingClass(code) {
  const keyDiv = document.querySelector(`div[data-key="${code}"]`);
  keyDiv.classList.add('playing');

  drumKeys.forEach(
    key => key.addEventListener('transitionend',
      (e) => {
        if (e.propertyName === 'transform') {
          keyDiv.classList.remove('playing');
        }
      }
    )
  );
}

function playAudio(code) {
  const audio = document.querySelector(`audio[data-key="${code}"]`);

  audio.play();
  audio.currentTime = 0;
}

window.addEventListener('keydown', playDrumKit);