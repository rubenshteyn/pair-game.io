// рандомное раскидывание чисел массива
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]

function cardInnerHtml() {
  // вставляю числа в карточки и вывожу их в html
  numbers.forEach((item) => document.querySelector('.game-card').insertAdjacentHTML('afterbegin', `        
  <div data-id="${item}" class="card">
      <span class="front">${item}</span>
      <img class="back" src="./img/geo.png" alt="">
  </div>`))
  shuffle(numbers)
}

cardInnerHtml()

const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard // первая и вторая перевернутые карточки

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true
    firstCard = this
    return
  }
  secondCard = this;
  checkForMatch();
}

function checkForMatch() { // проверка data атрибутов у карточек
  if (firstCard.dataset.id === secondCard.dataset.id) {
    disableCards()
    return
  }
  unflipCards();
}

function disableCards() { // удаление обработчика событий у выбранных карточек
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

let resetBtn = document.createElement('button')
resetBtn.textContent = 'Сыграть ещё раз'
resetBtn.classList.add('btn')
document.body.append(resetBtn)

function gameReset() {
  const flippedCards = document.querySelectorAll('.flip')
  flippedCards.forEach(elem => {
    if(flippedCards.length === cards.length) {
      resetBtn.classList.add('opacity')
    }
  });
}
setInterval(() => {
  gameReset()
}, 300);

resetBtn.addEventListener('click', function () {
  resetBtn.classList.remove('opacity')
  for (const card of cards) {
    card.classList.remove('flip');
  }

  (function shuffleResetBtn() {
    cards.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * 16);
      card.style.order = ramdomPos;
    });
  }())
})

cards.forEach(card => card.addEventListener('click', flipCard));