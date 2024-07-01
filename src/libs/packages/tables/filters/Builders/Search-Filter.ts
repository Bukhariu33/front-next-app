import SearchFilterUI from '../ui/search-filter';
import type { Filters } from '.';
import BaseFilter from './BaseFilter';

class SearchFilter extends BaseFilter<string> {
  private keyword: string;

  public name: keyof Filters = 'searchFilter';

  /**
   * @param key - filter key @default keyword
   */
  constructor(key = 'keyword') {
    super(key);
    this.keyword = '';
  }

  public setKeyword(keyword: string) {
    this.keyword = keyword;
    this.subscription.notify(keyword);
  }

  public apply() {
    if (this.keyword) return this.serialize(this.keyword);
    return {};
  }

  public clear() {
    this.keyword = '';
    this.subscription.notify(this.keyword);
  }

  public getUIFilter() {
    return SearchFilterUI({
      builder: this,
    });
  }
}

export { SearchFilter };
