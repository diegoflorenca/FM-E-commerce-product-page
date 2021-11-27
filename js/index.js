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
const previousPhoto = document.querySelectorAll('.previous-photo');
const nextPhoto = document.querySelectorAll('.next-photo');
const currentPhotos = document.querySelectorAll('.product-big-photo');

previousPhoto.forEach((prevPhoto) => {
  prevPhoto.addEventListener('click', updatePhoto);
});

nextPhoto.forEach((nextPhoto) => {
  nextPhoto.addEventListener('click', updatePhoto);
});

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

  updateBigPhoto(photoCounter);
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

/* Change detailed photo */
const thumbnails = document.querySelectorAll('.thumb');
thumbnails.forEach((thumb) => {
  thumb.addEventListener('click', changeDetailedPhoto);
});

function changeDetailedPhoto(e) {
  const thumbNumber = e.currentTarget.dataset.number;
  updateBigPhoto(thumbNumber);
}

/* Fullscreen photos */
const btnTogglePhotosFullscreen = document.querySelector('.toggle-photos');
const photosFullscreen = document.querySelector('.photos-fullscreen');
const btnClose = document.querySelector('.fs-close');

btnTogglePhotosFullscreen.addEventListener('click', toggleFullscreen);
btnClose.addEventListener('click', toggleFullscreen);

function toggleFullscreen() {
  photosFullscreen.classList.toggle('active');
}

/* Update detailed photo */
function updateBigPhoto(imageNumber) {
  thumbnails.forEach((thumb) => {
    if (thumb.dataset.number == imageNumber) {
      thumb.classList.add('active');
    } else {
      thumb.classList.remove('active');
    }
  });
  const imageUrl = `./images/image-product-${imageNumber}.jpg`;
  currentPhotos.forEach((currentPhoto) => {
    currentPhoto.setAttribute('src', imageUrl);
  });
}

/* Toggle cart */
const cart = document.querySelector('.cart');
const btnCartToggle = document.querySelector('.icon-cart');

btnCartToggle.addEventListener('click', toggleCart);

function toggleCart() {
  const cartStatus = cart.dataset.status;
  if (cartStatus === 'idle') {
    cart.setAttribute('data-status', 'openned');
  } else {
    cart.setAttribute('data-status', 'idle');
  }
}

/* Products to cart */
const cartArray = [];
const form = document.querySelector('#form');
const btnSubmit = document.querySelector('.add-to-cart');

form.addEventListener('submit', addNewProductToCart);

function addNewProductToCart(e) {
  e.preventDefault();
  const productQuantity = document.querySelector('#input-quantity').value;
  if (productQuantity <= 0) return;
  const productId = document.querySelector('#product-id').value;
  const productName = document.querySelector('#product-name').value;
  const productPrice = document.querySelector('#product-price').value;

  const newProductToCart = { id: parseInt(productId), name: productName, price: parseFloat(productPrice), quantity: parseInt(productQuantity) };

  cartArray.push(newProductToCart);
  updateCart();
}

let totalCartItems = 0;
const cartProductEl = document.querySelector('.cart-products');

function updateCart() {
  totalCartItems = 0;
  cartProductEl.innerHTML = '';

  if (cartArray.length == 0) {
    const pEl = document.createElement('p');
    pEl.classList.add('cart-empty');
    pEl.innerText = 'Your cart is empty.';
    cartProductEl.append(pEl);
    updateCartIcon();
    return;
  }

  cartArray.map((product, index) => {
    const cartInfoEl = document.createElement('div');
    cartInfoEl.classList.add('cart-info');
    cartInfoEl.classList.add('flex');
    cartInfoEl.classList.add('flex--center');

    const divEl = document.createElement('div');
    divEl.classList.add('flex');

    const imgEl = document.createElement('img');
    imgEl.setAttribute('src', `./images/image-product-${product.id}-thumbnail.jpg`);
    imgEl.setAttribute('alt', `Product ${product.id}`);
    divEl.append(imgEl);

    divAux = document.createElement('div');

    const productNameEl = document.createElement('p');
    productNameEl.classList.add('product-name');
    productNameEl.innerText = product.name;
    divAux.append(productNameEl);

    const productInfo = document.createElement('p');
    productInfo.innerText = '$ ';

    const spanPrice = document.createElement('span');
    spanPrice.classList.add('product-price');
    spanPrice.innerText += product.price;
    productInfo.append(spanPrice);

    productInfo.innerText += ' x ';

    const spanQuantity = document.createElement('span');
    spanQuantity.classList.add('selected-quantity');
    spanQuantity.innerText += product.quantity;
    productInfo.append(spanQuantity);

    const spanTotalPrice = document.createElement('span');
    spanTotalPrice.classList.add('total-price');
    const totalPrice = product.price * product.quantity;
    spanTotalPrice.innerText += `$${totalPrice}`;
    productInfo.append(spanTotalPrice);

    divAux.append(productInfo);
    divEl.append(divAux);
    cartInfoEl.append(divEl);

    const btnRemove = document.createElement('button');
    btnRemove.classList.add('btn-remove-product');
    btnRemove.setAttribute('onclick', `removeItem(${index})`);

    cartInfoEl.append(btnRemove);

    cartProductEl.append(cartInfoEl);

    totalCartItems += product.quantity;
  });

  updateCartIcon();
}

function removeItem(index) {
  totalCartItems -= cartArray[index].quantity;
  cartArray.splice(index, 1);
  updateCart();
}

function updateCartIcon() {
  const cartItems = document.querySelector('.cart-items');
  if (cartArray.length >= 1) {
    cartItems.style.display = 'block';
    cart.setAttribute('data-hasItens', 'true');
    cartItems.innerText = totalCartItems;

    const btnCheckout = document.createElement('button');
    btnCheckout.classList.add('btn-checkout');
    btnCheckout.innerText = 'Checkout';
    cartProductEl.append(btnCheckout);
  } else {
    cartItems.style.display = 'none';
    cart.setAttribute('data-hasItens', 'false');
  }
}
