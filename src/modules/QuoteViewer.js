export default class {
  localStorageKey = 'today-quote';

  selectors = {
    root: '[data-js-quote-viewer]',
    text: '[data-js-quote-viewer-text]',
  };

  constructor() {
    this.root = document.querySelector(this.selectors.root);
    this.textElement = this.root.querySelector(this.selectors.text);

    this.state = this.getQuoteFromLocalStorage();

    this.render();
  }

  getQuoteFromLocalStorage() {
    const raw = localStorage.getItem(this.localStorageKey);
    return raw ? JSON.parse(raw) : null;
  }

  render() {
    if (!this.state) {
      this.textElement.textContent = 'No quote available.';
      return;
    }

    const { text } = this.state;

    this.textElement.textContent = text;

  }
}