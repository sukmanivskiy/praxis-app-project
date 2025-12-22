import gsap from 'gsap';

export default class {
  constructor(root) {
    this.root = root;

    this.init();
    this.bindEvents();
  }

  init() {
    this.setInitialVars();
    this.createTimeline();
  }

  setInitialVars() {
    gsap.set(this.root, {
      '--x-0': '92%',
      '--y-0': '49%',
      '--s-start-0': '12%',
      '--s-end-0': '38.96%',
      '--c-0': 'hsla(220,41%,10%,1)',

      '--x-1': '14%',
      '--y-1': '63%',
      '--s-start-1': '12%',
      '--s-end-1': '51.15%',
      '--c-1': 'hsla(220,41%,10%,1)',

      '--x-2': '94%',
      '--y-2': '13%',
      '--s-start-2': '12%',
      '--s-end-2': '28.71%',
      '--c-2': 'hsla(259,81%,37%,0.15)',

      '--x-3': '72%',
      '--y-3': '93%',
      '--s-start-3': '12%',
      '--s-end-3': '38.72%',
      '--c-3': 'hsla(266,85%,38%,0.2)',

      '--x-4': '39%',
      '--y-4': '8%',
      '--s-start-4': '12%',
      '--s-end-4': '25.74%',
      '--c-4': 'hsla(259,74%,52%,0.2)',
    });
  }

  createTimeline() {
    this.tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: { duration: 5, ease: 'none' }
    });

    this.tl
      .to(this.root, {
        '--x-0': '27%',
        '--y-0': '11%',
        '--s-end-0': '58.04%',

        '--x-1': '59%',
        '--y-1': '60%',
        '--s-end-1': '43.74%',

        '--x-2': '93%',
        '--y-2': '68%',
        '--s-end-2': '42.09%',
        '--c-2': 'hsla(259,80%,37%,0.1)',

        '--x-3': '55%',
        '--y-3': '47%',
        '--s-start-3': '3.46%',
        '--s-end-3': '33.12%',
        '--c-3': 'hsla(266,83%,38%,0.05)',

        '--x-4': '15%',
        '--y-4': '69%',
        '--s-end-4': '60.27%',
        '--c-4': 'hsla(259,74%,52%,0.18)',
      })
      .to(this.root, {
        '--x-0': '38%',
        '--y-0': '88%',
        '--s-end-0': '43.16%',

        '--x-1': '89%',
        '--y-1': '19%',
        '--s-start-1': '10.11%',
        '--s-end-1': '40.60%',

        '--x-2': '14%',
        '--y-2': '83%',
        '--s-end-2': '28.80%',
        '--c-2': 'hsla(259,80%,37%,0.2)',

        '--x-3': '47%',
        '--y-3': '7%',
        '--s-end-3': '34.23%',
        '--c-3': 'hsla(266,83%,38%,0.1)',

        '--x-4': '94%',
        '--y-4': '49%',
        '--s-end-4': '40.60%',
        '--c-4': 'hsla(259,74%,52%,0.1)',
      });
  }

  bindEvents() {
    this.expandBtn?.addEventListener('click', () => this.onExpand());
    this.collapseBtn?.addEventListener('click', () => this.onCollapse());
  }

  onExpand() {
    this.tl.pause();

    gsap.to(this.root, {
      '--x-0': '50%',
      '--y-0': '50%',
      duration: 0.6,
      ease: 'expo.out'
    });
  }

  onCollapse() {
    this.tl.play();
  }

  destroy() {
    this.tl.kill();
  }
}