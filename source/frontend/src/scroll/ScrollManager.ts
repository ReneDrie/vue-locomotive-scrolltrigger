import EventDispatcher from 'seng-event';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
// @ts-ignore
import LocomotiveScroll from 'locomotive-scroll';

gsap.registerPlugin(ScrollTrigger);

let locoScroll: any;

export default class ScrollManager extends EventDispatcher {
  private static CUSTOM_SCROLL: boolean = true;
  private wrapperElement: HTMLElement | null = null;
  constructor() {
    super();
  }

  public init(wrapperElement: HTMLElement): void {
    this.wrapperElement = wrapperElement;

    if (!ScrollManager.CUSTOM_SCROLL) return;

    locoScroll = new LocomotiveScroll({
      el: wrapperElement,
      smooth: true,
    });

    locoScroll.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.setScroll(0, value)
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: wrapperElement.style.transform ? 'transform' : 'fixed',
    });

    ScrollTrigger.addEventListener('refresh', () => locoScroll.update());
    ScrollTrigger.refresh();
  }

  public dispose(): void {
    if (locoScroll) {
      locoScroll.destroy();
    }
    super.dispose();
  }
}
