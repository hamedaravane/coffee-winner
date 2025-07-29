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
      }, 50);
      spinButton.disabled = false;
    }
  }, 100);
});
