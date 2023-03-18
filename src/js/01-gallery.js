import { galleryItems } from '../../assets/gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

console.log(galleryItems);

const gallery = document.querySelector('.gallery');
const galleryItemsRef = document.createElement('ul');
galleryItemsRef.classList = 'gallery';

const items = galleryItems
  .map(({ preview, original, description }) => {
    const galleryItems = `
	<li class="gallery__item">
		<a
		href="${original}"
		class="gallery__link">
			<img
			src="${preview}"
			alt="${description}"
			data-sourse="${original}"
			class="gallery__image"/>
		</a>
	</li>`;

    return galleryItems;
  })
  .join('');

console.log();
gallery.insertAdjacentHTML('afterbegin', items);

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
