import type { Status } from '@/libs/types/status';

import StatusFilterUI from '../ui/status-filter';
import type { Filters } from '.';
import BaseFilter from './BaseFilter';

export type Options = {
  label: string;
  value: Status;
};
class StatusFilter extends BaseFilter<Status> {
  private status: Status | undefined;

  private optionsList: Options[] = [];

  public name: keyof Filters = 'statusFilter';

  /**
   * @param key - filter key @default status
   */
  constructor(optionsList: Options[], defaultStatus?: Options, key = 'status') {
    super(key);
    this.status = defaultStatus ? defaultStatus.value : undefined;
    this.optionsList = optionsList;
  }

  public setStatus(status: Status) {
    this.status = status;
    this.subscription.notify(status);
  }

  public apply() {
    if (this.status) return this.serialize(this.status);
    return {};
  }

  public clear() {
    this.status = undefined;
    this.subscription.notify(this.status as any);
  }

  get options() {
    return this.optionsList;
  }

  public getUIFilter() {
    return StatusFilterUI({
      builder: this,
    });
  }
}

export { StatusFilter };
