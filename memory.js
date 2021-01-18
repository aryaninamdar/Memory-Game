document.addEventListener('DOMContentLoaded', () => {
  const cardArray = [
    {
      name: '1',
      img:"https://www.flaticon.com/svg/static/icons/svg/921/921234.svg"
    },
    {
      name: '2',
      img:"https://www.flaticon.com/svg/static/icons/svg/889/889505.svg"
    },
    {
      name: '3',
      img:"https://www.flaticon.com/svg/static/icons/svg/523/523686.svg"
    },
    {
      name: '4',
      img:"https://www.flaticon.com/svg/static/icons/svg/523/523684.svg"
    },
    {
      name: '5',
      img:"https://www.flaticon.com/svg/static/icons/svg/523/523666.svg"
    },
    {
      name: '6',
      img:"https://www.flaticon.com/svg/static/icons/svg/523/523689.svg"
    },
    {
      name: '1',
      img:"https://www.flaticon.com/svg/static/icons/svg/921/921234.svg"
    },
    {
      name: '2',
      img:"https://www.flaticon.com/svg/static/icons/svg/889/889505.svg"
    },
    {
      name: '3',
      img:"https://www.flaticon.com/svg/static/icons/svg/523/523686.svg"
    },
    {
      name: '4',
      img:"https://www.flaticon.com/svg/static/icons/svg/523/523684.svg"
    },
    {
      name: '5',
      img:"https://www.flaticon.com/svg/static/icons/svg/523/523666.svg"
    },
    {
      name: '6',
      img:"https://www.flaticon.com/svg/static/icons/svg/523/523689.svg"
    }
  ]

cardArray.sort(() => 0.5 - Math.random())

const board = document.querySelector('.game-container')
const word = document.querySelector('.score-word')
const result = document.querySelector('.score-num')
const time_result = document.querySelector('.time-word')
const timer_div = document.querySelector('.time-num')
const restart_btn = document.getElementById('restart-message')
const placeholder = "https://p.kindpng.com/picc/s/120-1207180_baby-blue-circle-sticker-hd-png-download.png"
const blank = "https://png.pngitem.com/pimgs/s/526-5264359_check-mark-icon-transparent-hd-png-download.png"
var cardsClicked = []
var cardsClickedId = []
var cardsMatched = []

// https://www.clipartmax.com/png/small/131-1313918_tick-mark-check-yes-correct-success-circle-icon-ok-icon.png

//creating game board
  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      var card = document.createElement('img')
      card.setAttribute('src', placeholder)
      card.setAttribute('data-id', i)
      card.addEventListener('click', flipCard)
      board.appendChild(card)
    }
  }

//flip  the card
  function flipCard() {
    startTimer()
    var cardId = this.getAttribute('data-id')
    cardsClicked.push(cardArray[cardId].name)
    cardsClickedId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsClicked.length === 2) {
      setTimeout(checkForMatch, 500)
    }
  }

//check for match
  function checkForMatch() {
    var cards = document.querySelectorAll('img')
    const firstCard = cardsClickedId[0]
    const secondCard = cardsClickedId[1]

    if(firstCard === secondCard) {
      cards[firstCard].setAttribute('src', placeholder)
      cards[secondCard].setAttribute('src', placeholder)
      alert('You have clicked the same image!')
    }
    else if (cardsClicked[0] === cardsClicked[1]) {
      cards[firstCard].setAttribute('src', blank)
      cards[secondCard].setAttribute('src', blank)
      cards[firstCard].removeEventListener('click', flipCard)
      cards[secondCard].removeEventListener('click', flipCard)
      cardsMatched.push(cardsClicked)
    }
    else {
      setTimeout(() => {
        cards[firstCard].setAttribute('src', placeholder)
        cards[secondCard].setAttribute('src', placeholder)
      }, 300)
    }
    cardsClicked = []
    cardsClickedId = []
    result.innerHTML = cardsMatched.length

    if (cardsMatched.length === cardArray.length/2) {
      pauseTimer()
      word.innerHTML = "Congratulations, "
      result.innerHTML = "You win!"
      time_result.innerHTML = "Your final time was:"
    }
  }

  restart_btn.addEventListener('click', function() {
    var cards = document.querySelectorAll('img')
    cardArray.sort(() => 0.5 - Math.random())
    cardsMatched = []
    word.innerHTML = "Score:"
    result.innerHTML = cardsMatched.length
    time_result.innerHTML = "Time:"
    timer_div.innerHTML = "00:00"
    resetTimer()
    for (var i = 0; i < cards.length; i++) {
      cards[i].setAttribute('src', placeholder)
      cards[i].addEventListener('click', flipCard)
    }
  })

  createBoard()

// Timer
  var timer;
  var m = 0;
  var s = 0;

  function runTimer() {
    timer_div.innerHTML = (m < 10 ? "0" + m: m) + ":" + (s < 10 ? "0" + s: s);
    s++;
    if (s == 60) {
      s = 0;
      m++;
    }
  }

  function startTimer() {
    if (!timer) {
      timer = setInterval(runTimer, 1000);
    }
  }

  function pauseTimer() {
    clearInterval(timer);
    timer = false;
  }

  function resetTimer() {
    clearInterval(timer);
    timer = false;
    s = 0;
    m = 0;
    timer_div.innerHTML = (m < 10 ? "0" + m: m) + ":" + (s < 10 ? "0" + s: s);
  }
})
