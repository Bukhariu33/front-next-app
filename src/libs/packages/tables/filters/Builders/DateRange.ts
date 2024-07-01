import DateFilterUI from '../ui/date-filter';
import type { Filters } from '.';
import BaseFilter from './BaseFilter';

export type DateFilter = {
  startDate?: string | null;
  endDate?: string | null;
};
class DateRangeFilter extends BaseFilter<DateFilter> {
  private startDate: DateFilter['startDate'];

  private endDate: DateFilter['endDate'];

  public name: keyof Filters = 'dateRange';

  /**
   * @param key - filter key @default date
   */
  constructor(key = 'date') {
    super(key);
    this.startDate = undefined;
    this.endDate = undefined;
  }

  static serializeDate(date: Date): string {
    return date.toLocaleDateString('en-CA');
  }

  public setStartDate(startDate: Date): void {
    // validate startDate
    if (this.endDateValue && startDate > new Date(this.endDateValue)) {
      throw new Error('Start date cannot be greater than end date');
    }
    this.startDate = DateRangeFilter.serializeDate(startDate);
    this.subscription.notify({
      startDate: this.startDate,
      endDate: this.endDate,
    });
  }

  public setEndDate(endDate: Date): void {
    // validate endDate
    if (this.startDateValue && endDate < new Date(this.startDateValue)) {
      throw new Error('End date cannot be less than start date');
    }
    this.endDate = DateRangeFilter.serializeDate(endDate);
    this.subscription.notify({
      startDate: this.startDate,
      endDate: this.endDate,
    });
  }

  get startDateValue() {
    return this.startDate;
  }

  get endDateValue() {
    return this.endDate;
  }

  public apply() {
    if (!this.startDate && !this.endDate) {
      return {};
    }
    let value = `${this.startDate}:${this.endDate}`;
    value = value.includes('undefined')
      ? value.replace(/undefined/g, '')
      : value;

    return this.serialize(value);
  }

  public clear(filter?: keyof DateFilter) {
    if (filter) {
      this[filter] = undefined;
    } else {
      this.startDate = undefined;
      this.endDate = undefined;
    }

    this.subscription.notify({
      startDate: this.startDate,
      endDate: this.endDate,
    });
  }

  public getUIFilter() {
    return DateFilterUI({
      builder: this,
    });
  }
}

export { DateRangeFilter };
