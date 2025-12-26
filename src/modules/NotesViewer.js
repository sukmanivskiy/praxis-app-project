export default class {
  localStorageKey = 'notes-items';

  selectors = {
    root: '[data-js-notes-viewer]',
    list: '[data-js-notes-viewer-list]',
    empty: '[data-js-notes-viewer-empty]',
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.listElement = this.rootElement.querySelector(this.selectors.list);
    this.emptyElement = this.rootElement.querySelector(this.selectors.empty);

    this.items = this.getItems();

    this.render();
  }

  getItems() {
    const raw = localStorage.getItem(this.localStorageKey);

    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      console.error('Error parsing notes-items');
      return [];
    }
  }

  render() {
    if (this.items.length === 0) {
      this.emptyElement.textContent = 'Your Notes list is empty';
      this.listElement.style.display = 'none';
      return;
    }

    this.emptyElement.style.display = 'none';

    this.listElement.innerHTML = this.items
      .map(
        ({ title, date }) => `
          <li class="tile__item">
            <span class="notes-viewer__title">${title}</span>
            <span class="notes-viewer__date">${date}</span>
          </li>
        `
      )
      .join('');
  }
}
