import gsap from "gsap";

export default class HeroGradient {
  constructor(el) {
    this.el = el;
    this.init();
  }

  init() {
    this.setInitial();
    this.createTimeline();
  }

  setInitial() {
    gsap.set(this.el, {
      '--s-start-0': '49%',
      '--s-end-0': '75%',
      '--x-0': '85%',
      '--y-0': '80%',
      '--c-0': 'hsla(220, 20%, 5%, 1)',

      '--s-start-1': '15%',
      '--s-end-1': '32%',
      '--x-1': '60%',
      '--y-1': '24%',
      '--c-1': 'hsla(46,100%,48%,0.36)',

      '--s-start-2': '55%',
      '--s-end-2': '72%',
      '--x-2': '13%',
      '--y-2': '82%',
      '--c-2': 'hsla(54, 0%, 0%, 0.49)',

      '--s-start-3': '13%',
      '--s-end-3': '68%',
      '--x-3': '24%',
      '--y-3': '7%',
      '--c-3': 'hsla(32,85%,45%,0.6)',
    });
  }

  createTimeline() {
    this.tl = gsap.timeline({
      repeat: -1,
      yoyo: true,
      defaults: {
        duration: 15,
        ease: 'none'
      }
    });

    this.tl.to(this.el, {
      '--x-0': '51%',
      '--y-0': '94%',
      '--c-0': 'hsla(220, 20%, 5%, 1)',

      '--x-1': '2%',
      '--y-1': '25%',
      '--c-1': 'hsla(46,100%,48%,0.36)',

      '--x-2': '98%',
      '--y-2': '20%',
      '--c-2': 'hsla(54, 0%, 0%, 0.49)',

      '--x-3': '95%',
      '--y-3': '92%',
      '--c-3': 'hsla(32,85%,45%,0.6)',
    });
  }

  destroy() {
    this.tl?.kill();
  }
}
