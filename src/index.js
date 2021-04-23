import './styles.css';
import galleryListTpl from './templates/image-list.hbs';
import UploadImageService from './js/apiService';
import LoadMoreButton from './js/loadMoreButtonService'

console.log(galleryListTpl);

const refs = {
    input: document.querySelector('[name="query"]'),
    submitBtn: document.querySelector('.upload-btn'),
    searchForm: document.querySelector('.search-form'),
    imagesSection: document.querySelector('.gallery-section'),
    loadMoreBtn: document.querySelector('.load-more-btn'),
    searchBtnSpinner: document.querySelector('.search-button-spinner'),
    loadBtnSpinner: document.querySelector('.load-button-spinner'),
    submitBtnText: document.querySelector('.submit-button-text'),
    loadMoreBtnText: document.querySelector('.load-button-text'),
    resetBtn: document.querySelector('.reset-button')
}

const uploadImages = new UploadImageService;

const loadMoreButton = new LoadMoreButton({
  selector: '.load-more-btn',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreButton.refs.loadMoreBtn.addEventListener('click', fetchArticles);

function onSearch(event) {
    event.preventDefault();
    uploadImages.query = event.currentTarget.elements.query.value;
    
    loadMoreButton.show();
    clearArticlesContainer();
    uploadImages.resetPage();
    fetchArticles();
}

function fetchArticles() {
    loadMoreButton.disable();
    uploadImages.fetchArticles().then(images => {
        appendImagesMarkup(images.hits);
        loadMoreButton.enable();
    })
}

function appendImagesMarkup (imgArray) {
    refs.imagesSection.insertAdjacentHTML('beforeend', galleryListTpl(imgArray))
}

function clearArticlesContainer() {
  refs.imagesSection.innerHTML = '';
}
// let pageNumber = 1;
// // const KEY = '21283413-606cd1182a523c739b6934f12';
// // const searchQuery = refs.input.value;

// console.log(refs.input);

// refs.searchForm.addEventListener('submit', onSubmit)


    
// function onSubmit(event) {
//     event.preventDefault();
//     const searchQuery = refs.input.value;

//     console.log('submit');
    
    
      
//      refs.renderImagesSection.innerHTML = '';
//         refs.searchBtnSpinner.classList.remove('is-hidden')
//     pageNumber = 1;
//     refs.loadMoreBtn.classList.remove('is-hidden');
//     // refs.submitBtn.setAttribute('disabled', true);
//     // refs.submitBtn.classList.add('disabled')
//     refs.submitBtnText.textContent = 'Loading...'
//     return fetch(`https://pixabay.com/api?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=${KEY}`).then(response => response.json()).then(images => {
        
//         refs.submitBtnText.textContent = 'Upload images'
//         refs.renderImagesSection.insertAdjacentHTML('beforeend', galleryListTpl(images.hits));
//         pageNumber += 1;
//         refs.searchBtnSpinner.classList.add('is-hidden'); 
//     }
       
//     );
    
    
   
    
    
// }

// refs.loadMoreBtn.addEventListener('click', onLoadMore)

// function onLoadMore(event) {
//     // event.preventDefault();
//     console.log('load more');
//     const searchQuery = refs.input.value;
    
    
//     refs.loadBtnSpinner.classList.remove('is-hidden');
//     refs.loadMoreBtnText.textContent = 'Loading...';
//     console.log(searchQuery);
//     return fetch(`https://pixabay.com/api?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=${KEY}`).then(response => response.json()).then(images => {
//         refs.loadBtnSpinner.classList.add('is-hidden');
//         refs.loadMoreBtnText.textContent = 'Load more';
//         refs.renderImagesSection.insertAdjacentHTML('beforeend', galleryListTpl(images.hits));
//         pageNumber += 1;
//     });
// }


// refs.resetBtn.addEventListener('click', resetPage);

// function resetPage(e) {
//     e.preventDefault();
//     pageNumber = 1;
//         refs.submitBtn.setAttribute('disabled', false);
//         refs.renderImagesSection.innerHTML = '';
//         refs.submitBtn.classList.remove('disabled');
//     refs.loadMoreBtn.classList.add('is-hidden');
//     refs.renderImagesSection.innerHTML = '';
//     refs.input.value = '';
//     console.log('reset');
// }