const spinner = document.getElementById('spinner');
const winnerDisplay = document.getElementById('winnerDisplay');
const spinButton = document.getElementById('spinButton');
const participantInput = document.getElementById('participantInput');

let spinInterval;

spinButton.addEventListener('click', () => {
  winnerDisplay.textContent = '';
  winnerDisplay.classList.remove('revealed');
  spinButton.disabled = true;

  const participants = participantInput.value
    .split('\n')
    .map(name => name.trim())
    .filter(name => name.length > 0);

  if (participants.length === 0) {
    spinner.textContent = '⚠️ No participants!';
    spinButton.disabled = false;
    return;
  }

  let counter = 0;
  spinInterval = setInterval(() => {
    spinner.textContent = participants[Math.floor(Math.random() * participants.length)];
    counter++;

    if (counter > 30) {
      clearInterval(spinInterval);
      const finalWinner = participants[Math.floor(Math.random() * participants.length)];
      spinner.textContent = '🎉 ' + finalWinner + ' 🎉';
      winnerDisplay.textContent = `Winner: ${finalWinner}`;
      setTimeout(() => {
        winnerDisplay.classList.add('revealed');
        fireConfetti(); // 🎊
      }, 50);
      spinButton.disabled = false;
    }
  }, 100);
});

function fireConfetti() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 50,
    spread: 720,
    ticks: 100,
    gravity: 0.5,
    scalar: 1.4,
    zIndex: 2000,
  };

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 80 * (timeLeft / duration);

    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: {
        x: Math.random() * 0.6 + 0.2,
        y: Math.random() * 0.3
      }
    }));
  }, 200);
}
