import { AbstractPageTransitionComponent } from 'vue-transition-component';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import HomePageTransitionController from './HomePageTransitionController';
import ScrollManager from '../../scroll/ScrollManager';

gsap.registerPlugin(ScrollTrigger);

// @vue/component
export default {
  name: 'HomePage',
  extends: AbstractPageTransitionComponent,
  mounted() {
    this.scroll = new ScrollManager();
    this.scroll.init(this.$el);

    const timeline = gsap.timeline({ paused: true });
    timeline.to(this.$refs.example, {
      rotation: 90,
      ease: 'none',
      duration: 1,
    });
    this.trigger = ScrollTrigger.create({
      trigger: this.$refs.example,
      animation: timeline,
      scrub: true,
      markers: true,
    });

    ScrollTrigger.update();
  },
  beforeDestroy() {
    this.trigger.kill();
    this.scroll.dispose();
  },
  methods: {
    handleAllComponentsReady() {
      this.transitionController = new HomePageTransitionController(this);
      this.isReady();
    },
  },
};
