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
const currentPhotos = document.querySelectorAll('.product-big-photo');

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
