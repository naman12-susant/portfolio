import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ImageTrail.css';

function lerp(a: number, b: number, n: number) {
  return (1 - n) * a + n * b;
}

function getLocalPointerPos(e: MouseEvent | TouchEvent, rect: DOMRect) {
  let clientX = 0,
    clientY = 0;
  if ('touches' in e && e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else if ('clientX' in e) {
    clientX = (e as MouseEvent).clientX;
    clientY = (e as MouseEvent).clientY;
  }
  return {
    x: clientX - rect.left,
    y: clientY - rect.top
  };
}

function getMouseDistance(p1: { x: number; y: number }, p2: { x: number; y: number }) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

class ImageItem {
  DOM: { el: HTMLElement; inner: HTMLElement | null } = { el: null!, inner: null };
  defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
  rect: { width: number; height: number } = { width: 140, height: 140 };
  resize: (() => void) | null = null;

  constructor(DOM_el: HTMLElement) {
    this.DOM.el = DOM_el;
    this.DOM.inner = this.DOM.el.querySelector('.content__img-inner');
    this.getRect();
    this.initEvents();
  }
  initEvents() {
    this.resize = () => {
      gsap.set(this.DOM.el, this.defaultStyle);
      this.getRect();
    };
    window.addEventListener('resize', this.resize);
  }
  getRect() {
    const r = this.DOM.el.getBoundingClientRect();
    this.rect = {
      width: r.width || 140,
      height: r.height || 140
    };
  }
  destroy() {
    if (this.resize) {
      window.removeEventListener('resize', this.resize);
    }
  }
}

class ImageTrailEngine {
  container: HTMLElement;
  DOM: { el: HTMLElement };
  images: ImageItem[];
  imagesTotal: number;
  imgPosition: number;
  zIndexVal: number;
  activeImagesCount: number;
  isIdle: boolean;
  threshold: number;
  mousePos: { x: number; y: number };
  lastMousePos: { x: number; y: number };
  cacheMousePos: { x: number; y: number };
  rafId: number | null = null;
  targetElement: HTMLElement | Window | null = null;
  handlePointerMove: ((ev: MouseEvent | TouchEvent) => void) | null = null;
  initRender: ((ev: MouseEvent | TouchEvent) => void) | null = null;

  constructor(container: HTMLElement) {
    this.container = container;
    this.DOM = { el: container };
    this.images = Array.from(this.DOM.el.querySelectorAll<HTMLElement>('.content__img')).map(img => new ImageItem(img));
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 10;
    this.activeImagesCount = 0;
    this.isIdle = true;
    this.threshold = 40;

    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };

    // Issue 1 Fix: Register mousemove and touchmove on interactive parent or window
    this.targetElement = container.parentElement || window;

    this.handlePointerMove = (ev: MouseEvent | TouchEvent) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
    };
    this.targetElement.addEventListener('mousemove', this.handlePointerMove as EventListener);
    this.targetElement.addEventListener('touchmove', this.handlePointerMove as EventListener);

    this.initRender = (ev: MouseEvent | TouchEvent) => {
      const rect = this.container.getBoundingClientRect();
      this.mousePos = getLocalPointerPos(ev, rect);
      this.cacheMousePos = { ...this.mousePos };

      this.loop();

      if (this.targetElement && this.initRender) {
        this.targetElement.removeEventListener('mousemove', this.initRender as EventListener);
        this.targetElement.removeEventListener('touchmove', this.initRender as EventListener);
      }
    };
    this.targetElement.addEventListener('mousemove', this.initRender as EventListener);
    this.targetElement.addEventListener('touchmove', this.initRender as EventListener);
  }

  loop() {
    this.render();
    this.rafId = requestAnimationFrame(() => this.loop());
  }

  render() {
    const distance = getMouseDistance(this.mousePos, this.lastMousePos);
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.15);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.15);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 10) {
      this.zIndexVal = 10;
    }
  }

  showNextImage() {
    ++this.zIndexVal;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    if (!img) return;

    img.getRect();

    gsap.killTweensOf(img.DOM.el);
    gsap
      .timeline({
        onStart: () => this.onImageActivated(),
        onComplete: () => this.onImageDeactivated()
      })
      .fromTo(
        img.DOM.el,
        {
          opacity: 1,
          scale: 0.6,
          zIndex: this.zIndexVal,
          x: this.cacheMousePos.x - img.rect.width / 2,
          y: this.cacheMousePos.y - img.rect.height / 2
        },
        {
          duration: 0.5,
          ease: 'power2.out',
          scale: 1,
          x: this.mousePos.x - img.rect.width / 2,
          y: this.mousePos.y - img.rect.height / 2
        },
        0
      )
      .to(
        img.DOM.el,
        {
          duration: 0.4,
          ease: 'power3.in',
          opacity: 0,
          scale: 0.3
        },
        0.35
      );
  }

  onImageActivated() {
    this.activeImagesCount++;
    this.isIdle = false;
  }
  onImageDeactivated() {
    this.activeImagesCount--;
    if (this.activeImagesCount === 0) {
      this.isIdle = true;
    }
  }

  // Issue 2 Fix: Implement destroy method to cancel RAF loop, remove event listeners and kill tweens
  destroy() {
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    if (this.targetElement) {
      if (this.handlePointerMove) {
        this.targetElement.removeEventListener('mousemove', this.handlePointerMove as EventListener);
        this.targetElement.removeEventListener('touchmove', this.handlePointerMove as EventListener);
      }
      if (this.initRender) {
        this.targetElement.removeEventListener('mousemove', this.initRender as EventListener);
        this.targetElement.removeEventListener('touchmove', this.initRender as EventListener);
      }
    }
    this.images.forEach(img => {
      img.destroy();
      if (img.DOM.el) gsap.killTweensOf(img.DOM.el);
    });
  }
}

type Props = {
  items: string[];
  variant?: number;
};

export default function ImageTrail({ items = [] }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return;
    const engine = new ImageTrailEngine(containerRef.current);
    return () => {
      engine.destroy();
    };
  }, [items]);

  return (
    <div className="image-trail-container" ref={containerRef}>
      {items.map((url, i) => (
        <div className="content__img" key={i}>
          <div className="content__img-inner" style={{ backgroundImage: `url(${url})` }} />
        </div>
      ))}
    </div>
  );
}
