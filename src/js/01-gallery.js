// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox'
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

export function createGalleryMarkup(items) {
    return items
      .map(({ preview, original, description }) => 
         `
          <li class="gallery__item">
            <a class="gallery__link" href="${original}">
              <img
                class="gallery__image"
                src="${preview}"
                data-source="${original}"
                alt="${description}"
              />
            </a>
          </li>
        `
      )
      .join("");
  };

const gallery = document.querySelector('.gallery');

const addGalleryMarkup = createGalleryMarkup(galleryItems);

gallery.innerHTML = addGalleryMarkup;

gallery.addEventListener("click", onImageClick);

function onImageClick(e) {
  blockStandartAction(e);

  if (e.target.nodeName !== "IMG") {
    return;
  }

  const instance = new SimpleLightbox(`
    <img src="${e.target.dataset.source}" width="800" height="600">
  `);
  instance.open();

  gallery.addEventListener("keydown", (e) => {
    if (e.code === "Escape") {
      instance.close();
    }
  });
}

function blockStandartAction(e) {
  e.preventDefault();
}

