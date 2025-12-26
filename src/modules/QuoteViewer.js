import { TodayQuote } from "@/modules/TodayQuote.js";

export default class {
  selectors = {
    root: '[data-js-quote-viewer]',
    text: '[data-js-quote-viewer-text]',
  };

  constructor() {
    this.root = document.querySelector(this.selectors.root);
    this.textElement = this.root.querySelector(this.selectors.text);

    this.state = TodayQuote;

    this.render();
  }

  render() {
    const { text } = this.state;
    this.textElement.textContent = text;
  }
}
