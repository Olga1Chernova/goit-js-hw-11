import { Notify } from 'notiflix';
import NewsApiServer from './js/news-api';

const refs = {
    form: document.querySelector('#search-form'),
    searchQuery: document.querySelector('input[name="searchQuery"]'),
    loadBtn: document.querySelector('.load-more'),
    gallery: document.querySelector('.gallery'),
}

// const userSearchQuery = refs.searchQuery.value.trim();


// function onLoadBtnClick() {
//     refs.loadBtn.classList.remove('invisible');
// }
// refs.loadBtn.addEventListener('click', onLoadBtnClick);