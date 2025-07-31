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

  // Let's make these defaults more exciting!
  const defaults = {
    startVelocity: 40, // Slightly lower initial push for a more "falling" feel
    spread: 360,       // Full circle spread for a grand explosion
    ticks: 60,         // Fewer ticks mean particles disappear faster, creating more "bursts"
    gravity: 0.8,      // Increased gravity makes them fall more realistically
    scalar: 1.2,       // Smaller scalar for less "zoom," more natural feel
    decay: 0.92,       // Add some decay for a more organic slowing down
    origin: { y: 0.7 }, // Start a bit lower on the screen for a "rising from the bottom" effect
    zIndex: 2000,
  };

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 100 * (timeLeft / duration) + 20;

    confetti(Object.assign({}, defaults, {
      particleCount: particleCount,
      origin: { x: Math.random() },
      colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
    }));

    confetti(Object.assign({}, defaults, {
      particleCount: particleCount / 2,
      origin: { x: Math.random() },
      shapes: ['circle'],
      scalar: 0.9,
      colors: ['#ffc0cb', '#ffe4e1', '#b0e0e6', '#87ceeb']
    }));
  }, 200);
}