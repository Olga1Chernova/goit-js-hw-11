import axios from 'axios';

export default class NewsApi {
  getUrl() {
    console.log(this)
      const URL = 'https://pixabay.com/api/';
      const KEY = '32280115-b50908f9a62d9acb0676d3a4b';
    
   return axios.get(`${URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
    .then(({data}) => data)
    .then(data => {
      this.page +=1;
      return data;
    });
  }
    setPage() {
    this.searchQuery = '';
    this.page = 1;
  }

  resetPage() {
    this.page = 1;
  }
get getSearchQuery() {
  return this.query;
}
set setSearchQuery(newQuery) {
  this.query = newQuery;
}
};