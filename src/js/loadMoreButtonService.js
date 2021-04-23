export default class LoadMoreButton {
    constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);
    hidden && this.hide();
    }
    
    getRefs(selector) {
        const refs = {
        loadMoreBtn: document.querySelector(selector),
        loadMoreBtnText: document.querySelector('.load-button-text'),
        loadBtnSpinner: document.querySelector('.load-button-spinner'),
        goBackBtn: document.querySelector('.back-btn')
       };
       return refs;
    }
    
     enable() {
     this.refs.loadMoreBtn.disabled = false;
     this.refs.loadMoreBtnText.textContent = 'Load more';
     this.refs.loadBtnSpinner.classList.add('is-hidden');
     
    }
    
    disable() {
      this.refs.loadMoreBtn.disabled = true;
      this.refs.loadMoreBtnText.textContent = 'Loading...';
      this.refs.loadBtnSpinner.classList.remove('is-hidden');
      
    }
    
     show() {
         this.refs.loadMoreBtn.classList.remove('is-hidden');
         this.refs.goBackBtn.classList.remove('is-hidden');
    }
    
    hide() {
        this.refs.loadMoreBtn.classList.add('is-hidden');
        this.refs.goBackBtn.classList.add('is-hidden')
  }
}