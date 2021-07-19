
import {galleryItems} from './app.js';

const refs = {
    galleryUl: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.lightbox'),
    lightboxImage: document.querySelector('.lightbox__image'),
    lightboxOverlay: document.querySelector('.lightbox__overlay'),
    closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  };
  
  refs.galleryUl.addEventListener('click', onOpenClickGallery);
  refs.closeModalBtn.addEventListener('click', CloseModalBtn);
  refs.lightboxOverlay.addEventListener('click', onBackdropClick);
  
  //создал разметку галереи через метод map
  // const itemCardsGallery =  createElement ();
  function createElement () {
  return galleryItems
      .map(({ original, preview, description }, index) => {
        return `
      <li class = gallery__item> 
        <a href="${original}" class = gallery__link>
          <img 
            class = gallery__image 
            src="${preview}" 
            alt= "${description}" 
            data-source='${original}'
            data-index='${index}'> 
        </a>
      </li>
  `;
      })
      .join('');
    };
  refs.galleryUl.insertAdjacentHTML('beforeend', createElement());
  console.log(refs.galleryUl);
  
  //функция на событие для просмотра изображения в модальгном окне
  function onOpenClickGallery(event) {
    window.addEventListener('keydown', onEscKeydown);
    event.preventDefault();
    if (event.target.nodeName === 'IMG') {
      refs.lightbox.classList.add('is-open');
      refs.lightboxImage.src = event.target.getAttribute('data-source');
      refs.lightboxImage.alt = event.target.alt;
      refs.lightboxImage.dataset.index = event.target.dataset.index;
    }
    console.log(event.target.nodeName);
    // const isImagesLightboxEl = event.target.classList.contains('lightbox__image');
    // if(!isImagesLightboxEl) {
    //   return;
    // }
    //  if (event.target.nodeName === 'IMG') {
    //  return;
    //  }
  }
  
  //функция для закрывания модалього окна при нажатии на кнопку
  function CloseModalBtn(event) {
    window.removeEventListener('keydown', onEscKeydown);
    refs.lightbox.classList.remove('is-open');
    refs.lightboxImage.src = '';
    refs.lightboxImage.alt = '';
  }
  
  //функция для закрывания модалього окна при нажатии на бекдроп-оверлей
  function onBackdropClick(event) {
    if (event.currentTarget === event.target) {
      CloseModalBtn();
    }
  }
  
  //функция для закрывания модалього окна при нажатии на esc
  function onEscKeydown(event) {
    const ESC_KEY_CODE = "Escape";
    if (event.code === ESC_KEY_CODE) {
      CloseModalBtn();
    }
    console.log(event);
  }
  
  //скрипт для перелистывания картинок клавишами вправо и влево 
  window.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
      onArrowLeft();
    }
    if (event.code === "ArrowRight") {
      onArrowRight();
    }
  });
  
  function onArrowLeft() {
    let index = +refs.lightboxImage.dataset.index;
    if (index === 0) {
      step(galleryItems.length - 1);
      return;
    }
    step(index, -1);
  }
  function onArrowRight() {
    let index = +refs.lightboxImage.dataset.index;
    if (index === galleryItems.length - 1) {
      step(0);
      return;
    }
    step(index, 1);
  }
  
  function step(index, step = 0) {
    refs.lightboxImage.dataset.index = `${index + step}`;
    refs.lightboxImage.src = galleryItems[index + step].original;
  }
  