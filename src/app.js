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
  onButton: document.querySelector('[data-action="close-lightbox]'),
};
// // создал  галерею картинок и поместил в список через метод reduce
// const createGallery = ({original, preview, description}) =>
// `<li class = gallery__item >
// <a href="${original}" class = gallery__link>
// <img class = gallery__image src="${preview}" alt= "${description}" data-source='${original}'>
// </a>
// </li>`;

// const showGallery = galleryItems.reduce((acc, galleryItem) =>
// acc + createGallery(galleryItem),   '',);
// refs.galleryUl.insertAdjacentHTML('beforeend', showGallery);


//создал галерею через метод map

const itemCardsGallery = createGallery();
refs.galleryUl.insertAdjacentHTML('beforeend', itemCardsGallery);

function createGallery() {
  return galleryItems.map(({ original, preview, description }) => {
    return `
    <li class = gallery__item > 
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
console.log(refs.galleryUl);


// добавил слушателя событий на галерею
refs.galleryUl.addEventListener('click', onTagsClickGallery);

function onTagsClickGallery (event) {
  // const isImagesLightboxEl = event.target.classList.contains('lightbox__image');
  // if(!isImagesLightboxEl) {
  //   return;
  // }
//  if (event.target.nodeName === 'IMG') {
//  return;
//  }

if (event.target.nodeName === event.target.classList.contains('lightbox__image')) {
  refs.lightbox.classList.add('is-open');
  refs.lightbox.document.querySelector('lightbox__image').src = event.target.src;
  refs.lightbox.document.querySelector('lightbox__image').alt = event.target.alt;
   }

// const lightboxImageEl = event.target;
// const parentGallery = lightboxImageEl.closest('js-lightbox');
// parentGallery.classList.add('is-open');
 console.log(event.target.nodeName);
}
