/*
Menu toggle
*/
const btnMenu = document.querySelector('.menu-toggle');
const headerElement = document.querySelector('header');

btnMenu.addEventListener('click', menuToggle);

function menuToggle() {
  headerElement.classList.toggle('active');
}

/*
Mobile photo navigation
*/
const previousPhoto = document.querySelector('.previous-photo');
const nextPhoto = document.querySelector('.next-photo');
const currentPhoto = document.querySelector('.product-big-photo');

previousPhoto.addEventListener('click', updatePhoto);
nextPhoto.addEventListener('click', updatePhoto);

let photoCounter = 1;

function updatePhoto(e) {
  const trigger = e.currentTarget.className;
  if (trigger == 'next-photo') {
    photoCounter++;
    if (photoCounter == 5) photoCounter = 1;
  } else {
    photoCounter--;
    if (photoCounter == 0) photoCounter = 4;
  }

  const imageUrl = `./images/image-product-${photoCounter}.jpg`;
  currentPhoto.setAttribute('src', imageUrl);
}

/*
Product quantity selector
*/
const btnMinus = document.querySelector('[data-quantity=minus]');
const btnPlus = document.querySelector('[data-quantity=plus]');
const inputQuantity = document.querySelector('#input-quantity');

btnMinus.addEventListener('click', updateQuantity);
btnPlus.addEventListener('click', updateQuantity);

function updateQuantity(e) {
  const operation = e.currentTarget.dataset.quantity;

  if (operation == 'minus' && inputQuantity.value != 0) {
    inputQuantity.value--;
  }

  if (operation == 'plus') {
    inputQuantity.value++;
  }
}
