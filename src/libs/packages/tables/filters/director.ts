/* eslint-disable no-underscore-dangle */
import type FilterBuilder from './Builders/BaseFilter';

class FiltersDirector {
  private filter: Record<string, FilterBuilder<any>>;

  private _hasDefaultFilter: boolean;

  /**
   *
   * @param filter - array of filter filter
   * @description Director class for the filter filter
   * Build filter string for the API request and return it
   */
  constructor(filter: Record<string, FilterBuilder<any>>) {
    this.filter = filter;

    if (Object.keys(this.filter).length > 0) {
      this._hasDefaultFilter = true;
    } else {
      this._hasDefaultFilter = false;
    }
  }

  public getBuilder(key: string): FilterBuilder<any> | undefined {
    return this.filter[key];
  }

  public applyFilters() {
    const filters: Record<string, string | number> = {};

    Object.values(this.filter).forEach(builder => {
      const filter = builder.apply();
      Object.assign(filters, filter);
    });

    return filters;
  }

  get hasDefaultFilter() {
    return this._hasDefaultFilter;
  }

  public clearFilters() {
    Object.values(this.filter).forEach(builder => {
      builder.clear();
    });
  }

  public getUIFilters() {
    const Components: JSX.Element[] = [];
    if (!this.filter) return Components;
    Object.values(this.filter).forEach(builder => {
      if (!builder.hideUI) Components.push(builder.getUIFilter());
    });

    return Components;
  }
}

export default FiltersDirector;
