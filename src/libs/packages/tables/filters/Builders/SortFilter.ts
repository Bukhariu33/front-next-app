import type { Namespace } from '@/libs/types/utils/withTranslation';

import SortDropDownFilter from '../ui/sort-dropdown-filter';
import type { Filters } from '.';
import BaseFilter from './BaseFilter';

type Options = {
  label: string;
  value: string;
};

type SortKey<T extends Options[]> = T[number]['value'];
class SortFilter extends BaseFilter<string> {
  private sort: string | undefined;

  private namespace?: Namespace;

  private optionsList: Options[] = [];

  public name: keyof Filters = 'sortFilter';

  /**
   * @param key - filter key @default sort
   */
  constructor(optionsList: Options[], key = 'sort', namespace?: Namespace) {
    super(key);
    this.sort = undefined;
    this.optionsList = optionsList;
    this.namespace = namespace;
  }

  public setSortBy(sortBy: SortKey<typeof this.optionsList>) {
    this.sort = sortBy;
    this.subscription.notify(sortBy);
  }

  public apply() {
    if (this.sort)
      return {
        [this.key]: this.sort,
      };
    return {};
  }

  public clear() {
    this.sort = undefined;
    this.subscription.notify(this.sort as any);
  }

  get options() {
    return this.optionsList;
  }

  public getUIFilter() {
    return SortDropDownFilter({
      builder: this,
      namespace: this.namespace || 'common',
    });
  }
}

export { SortFilter };
