const btnMinus = document.querySelector('[data-quantity=minus]');
const btnPlus = document.querySelector('[data-quantity=plus]');
const inputQuantity = document.querySelector('#input-quantity');

btnMinus.addEventListener('click', updateQuantity);
btnPlus.addEventListener('click', updateQuantity);

function updateQuantity(e) {
  const operation = e.currentTarget.dataset.quantity;

  if(operation == 'minus' && inputQuantity.value != 0) {
    inputQuantity.value--;
  }

  if(operation == 'plus') {
    inputQuantity.value++;
  }
}