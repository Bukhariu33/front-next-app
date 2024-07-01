import TypeFilterUI from '../ui/type-filter';
import type { Filters } from '.';
import BaseFilter from './BaseFilter';

export type Type = any | undefined;

type Options = {
  label: string;
  value: Type;
};
class TypeFilter extends BaseFilter<Type> {
  private type: Type | undefined;

  private optionsList: Options[] = [];

  public name: keyof Filters = 'typeFilter';

  /**
   * @param key - filter key @default type
   */
  constructor(optionsList: Options[], defaultType?: Options, key = 'type') {
    super(key);
    this.type = defaultType ? defaultType.value : undefined;
    this.optionsList = optionsList;
  }

  public setType(type: Type) {
    this.type = type;
    this.subscription.notify(type);
  }

  public apply() {
    if (this.type) return this.serialize(this.type);
    return {};
  }

  public clear() {
    this.type = undefined;
    this.subscription.notify(this.type as Type);
  }

  public setOptions(newOptionsList: Options[]) {
    this.optionsList = newOptionsList;
    this.subscription.notify(this.type as Type);
  }

  get options() {
    return this.optionsList;
  }

  public getUIFilter() {
    return TypeFilterUI({
      builder: this,
    });
  }
}

export { TypeFilter };
