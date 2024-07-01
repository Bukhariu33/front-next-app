import Subscribable from '../Subscribable';

export type FilterParams = Record<`filter[${string}]`, string | number>;

abstract class BaseFilter<Data> {
  protected key: string;

  protected subscription: Subscribable<Data>;

  public hideUI: boolean = false;

  constructor(key: string) {
    this.key = key;
    this.subscription = new Subscribable();
  }

  /**
   *
   * @param value  - filter value
   * @returns  {string} - serialized filter for the API request
   * @description Serialize filter value
   * @example filter[date]=`2020-01-01:2020-01-31`
   */
  protected serialize(value: string | number): FilterParams {
    return {
      [`filter[${this.key}]`]: value,
    };
  }

  // Every derived class needs to implement this method.
  abstract apply(): FilterParams;

  abstract getUIFilter(): JSX.Element;

  abstract clear(args?: string): void;

  public subscribe(fn: (data: Data) => void) {
    this.subscription.subscribe(fn);
  }
}

export default BaseFilter;
