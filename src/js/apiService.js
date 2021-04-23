const API_KEY = '21283413-606cd1182a523c739b6934f12';
const BASE_URL = 'https://pixabay.com/api';


export default class UploadImageService {
     constructor() {
    this.searchQuery = '';
    this.pageNumber = 1;
    }
    
    fetchArticles() {
        const url = `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=12&key=${API_KEY}`;

    return fetch(url)
      .then(response => response.json())
      .then((images) => {
        this.incrementPage();
        return images;
      });
    }
    
    incrementPage() {
    this.pageNumber += 1;
    }
    
     resetPage() {
    this.pageNumber = 1;
    }
    
     get query() {
    return this.searchQuery;
    }
    
      set query(newQuery) {
    this.searchQuery = newQuery;
  }
}