export default class {
  selectors = {
    root: '[data-js-quotes]',
    quoteText: '[data-js-quotes-text]',
    quotePhilosophy: '[data-js-quotes-philosophy]',
  };

  constructor() {
    this.rootElement = document.querySelector(this.selectors.root);

    this.quoteTextElement = this.rootElement.querySelector(this.selectors.quoteText);
    this.quotePhilosophyElement = this.rootElement.querySelector(this.selectors.quotePhilosophy);

    this.quotes = this.getQuotesList();
    this.state = this.getTodayQuote();

    this.render();
  }

  getQuotesList() {
    return [
      {
        text: "Freedom is achieved through discipline.",
        philosophy: "Stoicism: mastery over impulses creates the foundation for inner freedom.",
      },
      {
        text: "The unexamined life is not worth living.",
        philosophy: "Socratic tradition: wisdom begins with introspection.",
      },
      {
        text: "We become what we repeatedly do.",
        philosophy: "Aristotle: excellence is a habit, not an act.",
      },
      {
        text: "Most fears are born of fatigue and loneliness.",
        philosophy: "Realism: the mind amplifies problems when the body is weak.",
      },
      {
        text: "Peace comes from within.",
        philosophy: "Buddhist principle: the external world cannot create internal harmony.",
      },
    ];
  }

  getDayOfYear() {
    const date = new Date();
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;

    return Math.floor(diff / oneDay);
  }

  getTodayQuote() {
    const day = this.getDayOfYear();
    const index = day % this.quotes.length;
    return this.quotes[index];
  }

  render() {
    const { text, philosophy } = this.state;

    this.quoteTextElement.textContent = text;
    this.quotePhilosophyElement.textContent = philosophy;
  }
}
