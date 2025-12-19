import '@a1rth/css-normalize'

import './styles/variables.scss'
import './styles/utils.scss'
import './styles/fonts.scss'
import './styles/globals.scss'
import './styles/todo.scss'
import './styles/field.scss'
import './styles/button.scss'
import './styles/todo-item.scss'

import TodoLogic from "./modules/TodoLogic.js";
import QuoteLogic from "@/modules/QuoteLogic.js";
import NotesLogic from "@/modules/NotesLogic.js";

const isTodoActive= document.querySelector("[data-js-todo]");
const isQuotesActive= document.querySelector("[data-js-quotes]");
const isNotesActive= document.querySelector("[data-js-notes]");

if (isTodoActive) {
  new TodoLogic();
}

if (isQuotesActive) {
  new QuoteLogic()
}

if (isNotesActive) {
  new NotesLogic()
}



