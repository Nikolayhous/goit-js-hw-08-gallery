const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

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
const itemCardsGallery = createGallery();
function createGallery() {
  return galleryItems
    .map(({ original, preview, description }) => {
      return `
    <li class = gallery__item class = gallery__link> 
      <a href="${original}" class = gallery__link>
        <img 
          class = gallery__image 
          src="${preview}" 
          alt= "${description}" 
          data-source='${original}'> 
      </a>
    </li>
`;
    })
    .join('');
}
refs.galleryUl.insertAdjacentHTML('beforeend', itemCardsGallery);
console.log(refs.galleryUl);

//функция на событие для просмотра изображения в модальгном окне
function onOpenClickGallery(event) {
  window.addEventListener('keydown', onEscKeydown);
  event.preventDefault();
  if (event.target.nodeName === 'IMG') {
    refs.lightbox.classList.add('is-open');
    refs.lightboxImage.src = event.target.getAttribute('data-source');
    refs.lightboxImage.alt = event.target.alt;
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
