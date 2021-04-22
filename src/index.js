import './styles.css';
import galleryListTpl from './templates/image-list.hbs';

console.log(galleryListTpl);

const refs = {
    input: document.querySelector('[name="query"]'),
    submitBtn: document.querySelector('.upload-btn'),
    searchForm: document.querySelector('.search-form'),
    renderImagesSection: document.querySelector('.gallery-section')
}

console.log(refs.input);

refs.searchForm.addEventListener('submit', onSubmit)

function onSubmit(event) {
    event.preventDefault();
    const searchQuery = event.currentTarget.elements.query.value;
    let pageNumber = 1;
    const KEY = '21283413-606cd1182a523c739b6934f12';

    console.log(searchQuery);

    return fetch(`https://pixabay.com/api?image_type=photo&orientation=horizontal&q=${searchQuery}&page=${pageNumber}&per_page=12&key=${KEY}`).then(response => response.json()).then(images => {
        refs.renderImagesSection.innerHTML = galleryListTpl(images.hits)
    });
}