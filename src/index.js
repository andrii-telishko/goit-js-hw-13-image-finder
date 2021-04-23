import './styles.css';
import galleryListTpl from './templates/image-list.hbs';
import UploadImageService from './js/apiService';
import LoadMoreButton from './js/loadMoreButtonService';
import makeError from './js/makeError';
import refs from './js/refs'

const uploadImages = new UploadImageService;
const loadMoreButton = new LoadMoreButton({
  selector: '.load-more-btn',
  hidden: true,
});
let scrollValue = 0;

refs.searchForm.addEventListener('submit', onSearch);
loadMoreButton.refs.loadMoreBtn.addEventListener('click', fetchArticles);
loadMoreButton.refs.goBackBtn.addEventListener('click', scrollUp);
refs.resetBtn.addEventListener('click', resetPage)

function onSearch(event) {
    event.preventDefault();
    
    uploadImages.query = event.currentTarget.elements.query.value;
    
    uploadImages.showSpinner();
    
    if (uploadImages.query === '') {
        makeError();
        uploadImages.hideSpinner();
        clearArticlesContainer();
        loadMoreButton.hide();
    }
    else {
     scrollValue = 0;
        loadMoreButton.show();
        clearArticlesContainer();
        uploadImages.resetPage();
        fetchArticles();
    };
}

function fetchArticles() {
    loadMoreButton.disable();
    
    uploadImages.fetchArticles().then(({hits}) => {
        appendImagesMarkup(hits);
        loadMoreButton.enable();
        uploadImages.hideSpinner();
        window.scrollTo({
            left: 0,
            top: scrollValue,
            behavior: 'smooth'
        });
        scrollValue += 850;
    })
}

function appendImagesMarkup (imgArray) {
    refs.imagesSection.insertAdjacentHTML('beforeend', galleryListTpl(imgArray))
}

function clearArticlesContainer() {
  refs.imagesSection.innerHTML = '';
}

function scrollUp() {
    window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth'
        });
}

function resetPage() {
    refs.input.value = "";
    clearArticlesContainer();
    loadMoreButton.hide();
}




