import { obj } from './pets.js';

window.onload = () => {
  burgerSubscribe();
};

const prev_btn = document.querySelector('.pets_button-left');
const next_btn = document.querySelector('.pets_button-right');
const carousel = document.querySelector('.carousel');
const item_left = document.querySelector('#item-left');
const item_right = document.querySelector('#item-right');

const createCardTemplate = () => {
  const card = document.createElement('div');
  card.classList.add('pets_card');
  card.classList.add('card-none-two');

  return card;
};

const moveLeft = () => {
  carousel.classList.add('transition-left');
  prev_btn.removeEventListener('click', moveLeft);
  next_btn.removeEventListener('click', moveRight);
};

const moveRight = () => {
  carousel.classList.add('transition-right');
  prev_btn.removeEventListener('click', moveLeft);
  next_btn.removeEventListener('click', moveRight);
};

prev_btn.addEventListener('click', moveLeft);
next_btn.addEventListener('click', moveRight);

carousel.addEventListener('animationend', (animationEvent) => {
  let changedItem;

  if (animationEvent.animationName === 'move-left') {
    carousel.classList.remove('transition-left');
    changedItem = item_left;
    document.querySelector('#item-active').innerHTML = item_left.innerHTML;
  } else {
    carousel.classList.remove('transition-right');
    changedItem = item_right;

    document.querySelector('#item-active').innerHTML = item_right.innerHTML;
  }
  changedItem.innerHTML = '';

  const shuffled = obj.sort(() => 0.5 - Math.random());
  let selected = shuffled.slice(0, 3);

  for (let i = 0; i < selected.length; i++) {
    const insertCart = createCardTemplate();

    let cardTamplate = `
    <img src="${selected[i].img}"/>
      <h3 class="pets_subtitle">${selected[i].name}</h3>
       <div>
        <button class="button pets_button-secondary">
           Learn more
        </button>
       </div>`;
    insertCart.insertAdjacentHTML('afterbegin', cardTamplate);
    changedItem.append(insertCart);
  }

  prev_btn.addEventListener('click', moveLeft);
  next_btn.addEventListener('click', moveRight);
});

