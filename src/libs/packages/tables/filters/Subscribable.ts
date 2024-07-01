export type CallBack<T> = (data: T) => void;

class Subscribable<Data> {
  private subscribers: Set<CallBack<Data>> = new Set();

  constructor() {
    this.subscribers = new Set();
  }

  public subscribe(fn: CallBack<Data>) {
    this.subscribers.add(fn);
    return () => this.subscribers.delete(fn);
  }

  public notify(data: Data) {
    this.subscribers.forEach(subscriber => subscriber(data));
  }
}

export default Subscribable;
