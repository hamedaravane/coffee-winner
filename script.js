const participants = [
  '@Iamsalari',
  '@yegane_nasir',
  '@Fatiuuf',
  '@aghaahadi',
  '@its_hosniaa',
  '@honeysaadati',
  '@Nazanin_a_k',
  '@Aidamarvi',
  '@Sa_ab1381',
  '@Fatemeh_shm7',
  '@Nazanin_PG',
  '@amirpirooznia',
  '@hare_lipped',
  '@nastrnii',
  '@Meeliicka',
  '@Marziehmahdavi_d',
  '@amirreza7746',
  '@mhmdkiapasha',
  '@slrrls',
  '@Yeganeh_Mahdavi',
  '@Hizhansoltani',
  '@Anidehgh',
  '@Mahdi_daliliyan',
  '@Saba_trs',
  '@arnavaz_am',
  '@ehsan_fahmidehh',
  'Mahsa',
  'Ftme',
  'گندمک',
  'Gray',
]

const spinner = document.getElementById('spinner')
const winnerDisplay = document.getElementById('winnerDisplay')
const spinButton = document.getElementById('spinButton')

let spinInterval

spinButton.addEventListener('click', () => {
  winnerDisplay.textContent = ''
  spinButton.disabled = true

  let counter = 0

  spinInterval = setInterval(() => {
    spinner.textContent = participants[Math.floor(Math.random() * participants.length)]
    counter++

    if (counter > 30) {
      clearInterval(spinInterval)
      const finalWinner = participants[Math.floor(Math.random() * participants.length)]
      spinner.textContent = '🎉 ' + finalWinner + ' 🎉'
      winnerDisplay.textContent = `Winner: ${finalWinner}`
      spinButton.disabled = false
    }
  }, 100)
})
