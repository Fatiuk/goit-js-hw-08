// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

// Change code below this line
const galleryList = document.querySelector('.gallery');
const galleryItemsMarkup = createGalleryItemsMarkup(galleryItems);

// Added gallery markup in HTML (document)
galleryList.insertAdjacentHTML('beforeend', galleryItemsMarkup);

// Create gallery markup from galleryItems (array)
function createGalleryItemsMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `
  <li class="gallery__item">
   <a class="gallery__link" href="${original}">
      <img class="gallery__image" src="${preview}" alt="${description}" />
   </a>
  </li>`;
    })
    .join('');
}

//Using the library 'Simplelightbox' (added options)
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
