export default class {
  selectors={
    root:'[data-js-todo]',
    newTaskForm:'[data-js-todo-new-task-form]',
    newTaskInput:'[data-js-todo-new-task-input]',
    totalTasks:'[data-js-todo-total-tasks]',
    deleteAllButton:'[data-js-todo-delete-all-button]',
    list:'[data-js-todo-list]',
    item:'[data-js-todo-item]',
    itemCheckbox:'[data-js-todo-item-checkbox]',
    itemLabel:'[data-js-todo-item-label]',
    itemDeleteButton:'[data-js-todo-item-delete-button]',
  }

  stateClasses = {
    isVisible: 'is-visible',
  }

  localStorageKey = 'todo-items';

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.newTaskFormElement = this.rootElement.querySelector(this.selectors.newTaskForm);
    this.newTaskInputElement = this.rootElement.querySelector(this.selectors.newTaskInput);
    this.totalTasksElement = this.rootElement.querySelector(this.selectors.totalTasks);
    this.deleteAllButtonElement = this.rootElement.querySelector(this.selectors.deleteAllButton);
    this.listElement = this.rootElement.querySelector(this.selectors.list);
    this.itemElement = this.rootElement.querySelector(this.selectors.item);
    this.itemCheckboxElement = this.rootElement.querySelector(this.selectors.itemCheckbox);
    this.itemLabelElement = this.rootElement.querySelector(this.selectors.itemLabel);
    this.itemDeleteButtonElement = this.rootElement.querySelector(this.selectors.itemDeleteButton);
    this.state = {
      items:this.getItemsFromLocalStorage(),
    }
    this.checkAndResetDaily();
    this.render();
    this.bindEvents();
  }

  getItemsFromLocalStorage() {
    const rawData = localStorage.getItem(this.localStorageKey);

    if (!rawData) {
      return [];
    }

    try {
      const parsedData = JSON.parse(rawData);
      return Array.isArray(parsedData) ? parsedData : [];
    } catch {
      console.error('Error getting items from local storage');
      return [];
    }
  }

  saveItemsToLocalStorage() {
    this.state.items = this.sortItems(this.state.items);

    localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(this.state.items)
    );
  }

  render() {
    this.totalTasksElement.textContent = this.state.items.length;

    this.deleteAllButtonElement.classList.toggle(
      this.stateClasses.isVisible,
      this.state.items.length > 0
    );

    const items = this.state.items;

    this.listElement.innerHTML = items.map(({id,title,isChecked}) => `
      <li class="todo__item todo-item" data-js-todo-item>
          <input
            class = "todo-item__checkbox"
            id = '${id}'
            type="checkbox"
            ${isChecked ? 'checked' : ''}
            data-js-todo-item-checkbox
          />
          <svg width="12" height="12">
            <use href="#tick"></use>
          </svg>
          <label
            class="todo-item__label"
            for = '${id}'
            data-js-todo-item-label
          >
            ${title}
          </label>
          <button
            class = "todo-item__delete-button"
            type = "button"
            aria-label="delete"
            title="delete"
            data-js-todo-item-delete-button
          >
            <svg width="12" height="12">
              <use href="#delete"></use>
            </svg>

          </button>
        </li>
    `).join('');

  }

  sortItems(items) {
    return [...items].sort((a, b) => {
      if (a.isChecked !== b.isChecked) {
        return a.isChecked - b.isChecked;
      }

      return 0;
    });
  }

  addItem(title) {
    this.state.items.push({
      id: crypto?.randomUUID() ?? Date.now().toString(),
      title,
      isChecked: false,
    });
    this.saveItemsToLocalStorage();
    this.render()
  }

  deleteItem(id) {
    this.state.items = this.state.items.filter(item => item.id !== id);
    this.saveItemsToLocalStorage();
    this.render()
  }

  toggleCheckedState(id) {
    this.state.items = this.state.items.map(item => {
      if (item.id === id) {
        return {
          ...item,
          isChecked: !item.isChecked,
        };
      }
      return item;
    });

    this.saveItemsToLocalStorage();
    this.render();
  }

  onNewTaskFormSubmit = (event) => {
    event.preventDefault();

    const newTodoItemTitle = this.newTaskInputElement.value
    if (newTodoItemTitle.trim().length > 0) {
      this.addItem(newTodoItemTitle);
      this.newTaskInputElement.value = ''
      this.newTaskInputElement.focus()
    }
  }

  onDeleteAllButtonClick = () => {
    const isConfirmed = confirm('Are you sure you want to delete all tasks?');

    if (isConfirmed) {
      this.state.items = []
      this.saveItemsToLocalStorage()
      this.render()
    }
  }

  onListClick = ({target}) => {
    if(target.matches(this.selectors.itemDeleteButton)) {
      const itemElement = target.closest(this.selectors.item)
      const itemCheckboxElement = itemElement.querySelector(this.selectors.itemCheckbox)

      setTimeout(() => {
        this.deleteItem(itemCheckboxElement.id)
      },400)
    }
  }

  onChange = ({target}) => {
    if(target.matches(this.selectors.itemCheckbox)) {
      setTimeout(() => {
        this.toggleCheckedState(target.id);
      }, 350);
    }
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

  bindEvents() {
    this.newTaskFormElement.addEventListener('submit', this.onNewTaskFormSubmit);
    this.deleteAllButtonElement.addEventListener('click', this.onDeleteAllButtonClick)
    this.listElement.addEventListener('click', this.onListClick)
    this.listElement.addEventListener('change', this.onChange)
  }
}
