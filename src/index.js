import { Notify } from 'notiflix';
import NewsApi from './js/news-api';

import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    form: document.querySelector('#search-form'),
    searchQuery: document.querySelector('input[name="searchQuery"]'),
    loadBtn: document.querySelector('button.load-more'),
    gallery: document.querySelector('.gallery'),
}

const newsApi = new NewsApi();
refs.loadBtn.setAttribute('disabled', true);

async function onFormSubmit(e) {
  e.preventDefault();
  clearMarkup();
 refs.loadBtn.classList.add('is-hidden');
  newsApi.searchQuery = refs.searchQuery.value.trim();
  newsApi.resetPage();
  await newsApi.getUrl().then(createMarkup).then((data) => {

    Notify.success(`Hooray! We found ${data.totalHits} images.`);
  })
  
}
refs.form.addEventListener('submit', onFormSubmit);

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

async function onLoadBtnClick() {

  await newsApi.getUrl().then(createMarkup).then((data) => {
    const total = data.totalHits / 40;
    if (newsApi.page >= total) {
      refs.loadBtn.setAttribute('disabled', true);
      return Notify.failure("We're sorry, but you've reached the end of search results.")
    }
      refs.loadBtn.removeAttribute('disabled');
  });
  newsApi.page += 1;
}
refs.loadBtn.addEventListener('click', onLoadBtnClick);

function createMarkup(data) {

    if (newsApi.searchQuery === '') {
        return;
    } else if (data.hits.length === 0) {
        return Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
        );
    } else {
        const markup = data.hits
            .map(
                ({
                    webformatURL,
                    largeImageURL,
                    tags,
                    likes,
                    views,
                    comments,
                    downloads,
                }) => {
                    return `
 <a class="gallery__item" href="${largeImageURL}">
  <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
  </a>
 `;
                }
            )
            .join('');
        refs.gallery.insertAdjacentHTML('beforeend', markup);
        if (data.total <= 40) {
            lightbox.refresh();
            return data;
        } else {
            refs.loadBtn.removeAttribute('disabled');
        }
        lightbox.refresh();

    
        return data;
    }
}

function onCardGalleryClick(e) {
    e.preventDefault();
    window.addEventListener('keydown', closeModalKeydown);
 
    const findGalleryCard = e.target.classList.contains('gallery__image');
    if (!findGalleryCard) {
        return;
    }
}
refs.gallery.addEventListener('click', onCardGalleryClick);

function closeModalKeydown(e) {
  if (e.code === 'Escape') {
    lightbox.close(() => {
      window.removeEventListener('keydown', closeModalKeydown);
    });
  }
}
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  closeText: 'x',
});