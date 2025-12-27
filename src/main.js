import '@a1rth/css-normalize'

import './styles/variables.scss'
import './styles/utils.scss'
import './styles/fonts.scss'
import './styles/globals.scss'
import './styles/todo.scss'
import './styles/field.scss'
import './styles/button.scss'
import './styles/todo-item.scss'
import './styles/quotes.scss'
import './styles/notes.scss'
import './styles/home.scss'
import './styles/tile.scss'
import './styles/timer.scss'

import TodoLogic from "./modules/TodoLogic.js";
import QuoteLogic from "@/modules/QuoteLogic.js";
import NotesLogic from "@/modules/NotesLogic.js";
import TodoBg from "@/modules/TodoBg.js";
import QuotesBg from "@/modules/QuotesBg.js";
import NotesBg from "@/modules/NotesBg.js";
import MainBg from "@/modules/MainBg.js";
import TodoViewer from "@/modules/TodoViewer.js";
import QuoteViewer from "@/modules/QuoteViewer.js";
import NotesViewer from "@/modules/NotesViewer.js";
import Timer from "@/Timer.js";
import ogImage from "@/assets/images/og-image.png"

const isTodoActive= document.querySelector("[data-js-todo]");
const isQuotesActive= document.querySelector("[data-js-quotes]");
const isNotesActive= document.querySelector("[data-js-notes]");
const isHomeActive= document.querySelector("[data-js-home]");

const mainBackground = document.querySelector("[data-js-main-background]");
const todoBackground = document.querySelector("[data-js-todo-background]");
const quotesBackground = document.querySelector("[data-js-quotes-background]");
const notesBackground = document.querySelector("[data-js-notes-background]");


if (isTodoActive) {
  new TodoLogic();
  new TodoBg(todoBackground);
}

if (isQuotesActive) {
  new QuoteLogic()
  new QuotesBg(quotesBackground);
}

if (isNotesActive) {
  new NotesLogic()
  new NotesBg(notesBackground);
}

if (isHomeActive) {
  new MainBg(mainBackground);
  new TodoViewer()
  new QuoteViewer()
  new NotesViewer()
  new Timer()
}



