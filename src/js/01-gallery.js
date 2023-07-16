// Add imports above this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
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
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </li>`;
        })
        .join('');
}

// Added image click event
galleryList.addEventListener('click', selectImage);

function selectImage(e) {
    if (e.target.nodeName !== 'IMG') return;

    //Disallowed default behavior
    e.preventDefault();

    //Using the library 'Lightbox' (create image)
    const instance = basicLightbox.create(
        `<img src="${e.target.dataset.source}">`,
        {
            // EventListener for escapeCloseFunction
            onShow: instance => {
                document.addEventListener('keyup', escapeCloseFunction);
            },
            onClose: instance => {
                document.removeEventListener('keyup', escapeCloseFunction);
            },
        }
    );

    // Created function which closes the photo on the 'Escape'
    function escapeCloseFunction(e) {
        if (e.key === 'Escape') instance.close();
    }

    //Using the library 'Lightbox' (open image)
    instance.show();
}
