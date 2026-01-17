export class IntersectionObserverMock {
  static instances: IntersectionObserverMock[] = [];
  elements: Element[] = [];
  constructor(public callback: (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void) {
    IntersectionObserverMock.instances.push(this);
  }
  observe(element: Element) {
    this.elements = [...this.elements.filter((el) => el !== element), element];
  }
  unobserve(element: Element) {
    this.elements = this.elements.filter((el) => el !== element);
  }
  clear() {
    IntersectionObserverMock.instances = IntersectionObserverMock.instances.filter((instance) => instance !== this);
    this.elements = [];
  }
  trigger(entries: IntersectionObserverEntry[]) {
    this.callback(entries, this as unknown as IntersectionObserver);
  }
}
