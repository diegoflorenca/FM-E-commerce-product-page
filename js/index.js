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
