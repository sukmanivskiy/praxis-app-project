export default class {
  selectors = {
    root: '[data-js-notes]',
    newForm: '[data-js-notes-new-form]',
    newTitle: '[data-js-notes-new-title]',
    newText: '[data-js-notes-new-text]',
    deleteAllButton: '[data-js-notes-delete-all]',
    list: '[data-js-notes-list]',
    item: '[data-js-notes-item]',
    itemDetails: '[data-js-notes-item-details]',
    itemTitle: '[data-js-notes-item-title]',
    itemDate: '[data-js-notes-item-date]',
    itemText: '[data-js-notes-item-text]',
    itemDeleteButton: '[data-js-notes-item-delete-button]',
  };

  stateClasses = { isVisible: 'is-visible' };
  localStorageKey = 'notes-items';

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.newFormElement = this.rootElement.querySelector(this.selectors.newForm);
    this.newTitleElement = this.rootElement.querySelector(this.selectors.newTitle);
    this.newTextElement = this.rootElement.querySelector(this.selectors.newText);
    this.deleteAllButtonElement = this.rootElement.querySelector(this.selectors.deleteAllButton);
    this.listElement = this.rootElement.querySelector(this.selectors.list);

    this.state = { items: this.getItemsFromLocalStorage() };

    this.render();
    this.bindEvents();
  }

  getItemsFromLocalStorage() {
    const raw = localStorage.getItem(this.localStorageKey);
    if (!raw) return [];
    try { return JSON.parse(raw); } catch { return []; }
  }

  saveItemsToLocalStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.state.items));
  }

  render() {
    const items = this.state.items;

    this.deleteAllButtonElement.classList.toggle(
      this.stateClasses.isVisible,
      items.length > 0
    );

    this.listElement.innerHTML = items.map(({ id, title, text, date }) => `
      <li class="notes__item" data-js-notes-item>
        <details class="notes__details" data-js-notes-item-details>
          <summary class="notes__summary">
            <span class="notes__title" data-js-notes-item-title>${title}</span>
            <span class="notes__date" data-js-notes-item-date>${date}</span>
          </summary>
          <div class="notes__text" data-js-notes-item-text>
            <p>${text}</p>
            <button 
              type="button" 
              class="notes__delete-button notes__note-button"
              data-js-notes-item-delete-button 
              data-id="${id}">Delete</button>
            </div>
          
        </details>
      </li>
    `).join('');
  }

  addItem(title, text) {
    const newItem = {
      id: crypto?.randomUUID() ?? Date.now().toString(),
      title,
      text,
      date: new Date().toLocaleDateString(),
    };
    this.state.items.push(newItem);
    this.saveItemsToLocalStorage();
    this.render();
  }

  deleteItem(id) {
    this.state.items = this.state.items.filter(item => item.id !== id);
    this.saveItemsToLocalStorage();
    this.render();
  }

  onNewFormSubmit = (event) => {
    event.preventDefault();
    const title = this.newTitleElement.value.trim();
    const text = this.newTextElement.value.trim();
    if (!title || !text) return;

    this.addItem(title, text);
    this.newTitleElement.value = '';
    this.newTextElement.value = '';
    this.newTitleElement.focus();
  }

  onDeleteAllButtonClick = () => {
    if (confirm('Are you sure you want to delete all notes?')) {
      this.state.items = [];
      this.saveItemsToLocalStorage();
      this.render();
    }
  }

  onListClick = ({ target }) => {
    if (target.matches(this.selectors.itemDeleteButton)) {
      const id = target.dataset.id;
      if (id) this.deleteItem(id);
    }
  }

  bindEvents() {
    this.newFormElement.addEventListener('submit', this.onNewFormSubmit);
    this.deleteAllButtonElement.addEventListener('click', this.onDeleteAllButtonClick);
    this.listElement.addEventListener('click', this.onListClick);
  }
}
