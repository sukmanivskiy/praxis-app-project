import { TodayQuote } from "@/modules/TodayQuote.js";

export default class {
  selectors = {
    root: '[data-js-quotes]',
    quoteText: '[data-js-quotes-text]',
    quotePhilosophy: '[data-js-quotes-philosophy]',
  }

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);
    this.quoteTextElement = this.rootElement.querySelector(this.selectors.quoteText);
    this.quotePhilosophyElement = this.rootElement.querySelector(this.selectors.quotePhilosophy);

    this.state = TodayQuote;

    this.render();
  }

  render() {
    const { text, philosophy } = this.state;
    this.quoteTextElement.textContent = text;

    this.quotePhilosophyElement.innerHTML = '';
    philosophy.forEach(paragraph => {
      const p = document.createElement('p');
      p.textContent = paragraph;
      this.quotePhilosophyElement.appendChild(p);
    });
  }
}
