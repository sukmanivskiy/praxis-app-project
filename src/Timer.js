export default class {
  selectors = {
    root: '[data-js-timer]',
    display: '[data-js-timer-display]',
    plus: '[data-js-timer-plus]',
    minus: '[data-js-timer-minus]',
    start: '[data-js-timer-start]',
    reset: '[data-js-timer-reset]',
    modeButtons: '[data-js-timer-mode]',
    sound: '[data-js-timer-sound]',
    dialog: '[data-js-timer-dialog]',
    dialogOk: '[data-js-timer-dialog-button]'
  };

  constructor() {
    this.root = document.querySelector(this.selectors.root);

    this.display = this.root.querySelector(this.selectors.display);
    this.plusBtn = this.root.querySelector(this.selectors.plus);
    this.minusBtn = this.root.querySelector(this.selectors.minus);
    this.startBtn = this.root.querySelector(this.selectors.start);
    this.resetBtn = this.root.querySelector(this.selectors.reset);
    this.modeButtons = this.root.querySelectorAll(this.selectors.modeButtons);
    this.sound = this.root.querySelector(this.selectors.sound);
    this.dialog = document.querySelector(this.selectors.dialog);
    this.okBtn = this.dialog.querySelector(this.selectors.dialogOk);


    this.currentMode = 5;
    this.time = this.currentMode * 60;
    this.interval = null;
    this.isRunning = false;

    this.render();
    this.bindEvents();
    this.bindDialog();
  }

  bindEvents() {
    this.plusBtn.addEventListener('click', () => {
      this.time += this.currentMode * 60;
      this.render();
    });

    this.minusBtn.addEventListener('click', () => {
      this.time -= this.currentMode * 60;
      if (this.time < 0) this.time = 0;
      this.render();
    });

    this.modeButtons.forEach(btn =>
      btn.addEventListener('click', () => {
        this.currentMode = Number(btn.dataset.value);
        this.updateActiveMode(btn);
      })
    );

    this.startBtn.addEventListener('click', () => this.toggleStartPause());
    this.resetBtn.addEventListener('click', () => this.reset());
  }

  updateActiveMode(activeBtn) {
    this.modeButtons.forEach(btn => btn.classList.remove('is-active'));
    activeBtn.classList.add('is-active');
  }

  format(totalSeconds) {
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    if (h > 0) {
      return [
        h.toString().padStart(2, '0'),
        m.toString().padStart(2, '0'),
        s.toString().padStart(2, '0')
      ].join(':');
    }

    return [
      m.toString().padStart(2, '0'),
      s.toString().padStart(2, '0')
    ].join(':');
  }


  render() {
    this.display.textContent = this.format(this.time);
  }

  toggleStartPause() {
    if (this.isRunning) {
      this.pause();
    } else {
      this.start();
    }
  }

  start() {
    if (this.time <= 0) return;


    if (this.sound.paused) {
      this.sound.play().then(() => this.sound.pause()).catch(() => {});
    }

    this.isRunning = true;
    this.startBtn.textContent = 'Pause';

    this.interval = setInterval(() => {
      this.time--;
      this.render();

      if (this.time <= 0) {
        this.finish();
      }
    }, 1000);
  }

  pause() {
    this.isRunning = false;
    this.startBtn.textContent = 'Start';
    clearInterval(this.interval);
  }

  reset() {
    this.pause();
    this.time = this.currentMode * 60;
    this.render();
  }

  bindDialog() {

    this.okBtn.addEventListener('click', () => {
      this.sound.pause();
      this.sound.currentTime = 0;
      this.sound.loop = false;
      this.dialog.close();
    });
  }

  finish() {
    this.pause();
    this.time = 0;
    this.render();

    this.sound.loop = true;
    this.sound.play().catch(() => {});

    this.dialog.showModal();
  }

}
