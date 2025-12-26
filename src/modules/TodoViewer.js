export default class {
  localStorageKey = 'todo-items';

  selectors = {
    root: '[data-js-todo-viewer]',
    list: '[data-js-todo-viewer-list]',
    empty: '[data-js-todo-viewer-empty]',
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.listElement = this.rootElement.querySelector(this.selectors.list);
    this.emptyElement = this.rootElement.querySelector(this.selectors.empty);

    this.state = {
      items:this.getItemsFromLocalStorage(),
    }

    this.render();
  }

  getItemsFromLocalStorage() {
    const raw = localStorage.getItem(this.localStorageKey);

    if (!raw) return [];

    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      console.error('Error parsing todo-items');
      return [];
    }
  }

  render() {
    if (this.state.items.length === 0) {
      this.emptyElement.textContent = 'Your Tasklist is empty';
      this.emptyElement.style.display = 'block';
      this.listElement.style.display = 'none';
      return;
    }

    this.emptyElement.style.display = 'none';

    this.listElement.innerHTML = this.state.items
      .slice(0,5).map(
        ({ id, title, isChecked }) => `
          <li class="tile__item" style="color: ${isChecked ? 'var(--color-gray)' : ''}">
            <div class="tile__item-inner">
            <span class="tile__checkbox">
              ${isChecked ? '✓' : ''}
            </span>
            <span class="tile__item-title">
              ${title}
            </span>
</div>
          </li>
        `
      )
      .join('');
  }

  saveItemsToLocalStorage() {
    this.state.items = this.sortItems(this.state.items);

    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.state.items)
    );
  }

  sortItems(items) {
    return [...items].sort((a, b) => {
      if (a.isChecked !== b.isChecked) {
        return a.isChecked - b.isChecked;
      }

      return 0;
    });
  }

  getTodayDate() {
    return new Date().toISOString().slice(0, 10);
  }

  checkAndResetDaily() {
    const today = this.getTodayDate();
    const last = localStorage.getItem(this.lastUsedDateKey);

    if (last !== today) {

      this.state.items = [];
      this.saveItemsToLocalStorage();
    }

    localStorage.setItem(this.lastUsedDateKey, today);
  }
}
