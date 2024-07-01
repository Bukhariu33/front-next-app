import isEqual from 'lodash/isEqual';

import Storage from './storage';

interface FilterObject {
  [key: string]: any;
}

class LocalDB {
  constructor(private db = new Storage()) {}

  static toResponse(
    data?: Record<string, any>,
    status = 200,
    _meta?: MetaData,
  ): APIResponse<any> {
    const keys = Object.keys(data || {});
    const meta: MetaData = _meta || {
      total: keys.length,
      currentPage: 1,
      eachPage: keys.length,
      lastPage: 1,
    };
    return {
      status,
      data,
      meta,
    };
  }

  static filter(data: Record<string, any>, filter: FilterObject) {
    return data.filter((item: any) => {
      return Object.entries(filter).every(([key, value]) => {
        if (value === undefined || value === null) {
          return true;
        }
        if (typeof value === 'object') {
          return isEqual(item[key], value);
        }
        return item[key] === value;
      });
    });
  }

  public createTable(table: string, data: Record<string, any>[]) {
    this.db.createFile(table);
    data.forEach(d => {
      this.db.save(table, d);
    });
    return LocalDB.toResponse(undefined, 201);
  }

  public getAll(table: string, filters?: FilterObject, sortFilter?: string) {
    let data = this.db.get(table);

    if (filters?.date) {
      const [startDate, endDate] = filters.date.split(':');
      const startTime = new Date(startDate).getTime();
      const endTime = new Date(endDate).getTime();

      data = data.filter((item: any) => {
        const itemTime = new Date(item.createdAt).getTime();
        return itemTime >= startTime && itemTime <= endTime;
      });
      // eslint-disable-next-line no-param-reassign
      delete filters.date;
    }

    if (filters) {
      data = data.filter((item: any) => {
        return Object.entries(filters).every(([key, value]) => {
          if (value === undefined || value === null) {
            return true;
          }
          if (Array.isArray(value)) {
            return value.includes(item[key]);
          }
          if (typeof value === 'object') {
            return isEqual(item[key], value);
          }
          return item[key] === value;
        });
      });
    }

    if (sortFilter) {
      const filter = sortFilter.startsWith('-') ? 'desc' : 'asc';
      const sort = sortFilter.replace('-', '');
      data = data.sort((a: any, b: any) => {
        if (sort in a && sort in b) {
          if (typeof a[sort] === 'number' && typeof b[sort] === 'number') {
            return filter === 'desc' ? b[sort] - a[sort] : a[sort] - b[sort];
          }
          if (typeof a[sort] === 'string' && typeof b[sort] === 'string') {
            return filter === 'desc'
              ? b[sort].localeCompare(a[sort])
              : a[sort].localeCompare(b[sort]);
          }
        }
        return 0;
      });
    }

    return LocalDB.toResponse(data);
  }

  public getAllPaginated(
    table: string,
    meta?: Pick<MetaData, 'currentPage' | 'eachPage'>,
    filters?: FilterObject,
    sortFilter?: string,
  ) {
    let data = this.db.get(table) || [];

    if (filters?.date) {
      const [startDate, endDate] = filters.date.split(':');
      const startTime = new Date(startDate).getTime();
      const endTime = new Date(endDate).getTime();

      data = data.filter((item: any) => {
        const itemTime = new Date(item.createdAt).getTime();
        return itemTime >= startTime && itemTime <= endTime;
      });

      // eslint-disable-next-line no-param-reassign
      delete filters.date;
    }

    if (filters) {
      data = data.filter((item: any) => {
        return Object.entries(filters).every(([key, value]) => {
          if (value === undefined || value === null) {
            return true;
          }
          if (Array.isArray(value)) {
            return value.includes(item[key]);
          }
          if (typeof value === 'object') {
            return isEqual(item[key], value);
          }
          return item[key] === value;
        });
      });
    }

    if (sortFilter) {
      const filter = sortFilter.startsWith('-') ? 'desc' : 'asc';
      const sort = sortFilter.replace('-', '');
      data = data.sort((a: any, b: any) => {
        if (sort in a && sort in b) {
          if (typeof a[sort] === 'number' && typeof b[sort] === 'number') {
            return filter === 'desc' ? b[sort] - a[sort] : a[sort] - b[sort];
          }
          if (typeof a[sort] === 'string' && typeof b[sort] === 'string') {
            return filter === 'desc'
              ? b[sort].localeCompare(a[sort])
              : a[sort].localeCompare(b[sort]);
          }
        }
        return 0;
      });
    }

    const { currentPage = 1, eachPage = 15 } = meta || {};
    const start = (currentPage - 1) * eachPage;
    const end = currentPage * eachPage;

    const paginatedData = data.slice(start, end);
    const metaData = {
      total: data.length,
      currentPage,
      eachPage,
      lastPage: Math.ceil(data.length / eachPage),
    };

    return LocalDB.toResponse(paginatedData, 200, metaData);
  }

  public getById(table: string, id: string) {
    const DATA = this.db.get(table);
    const data = DATA.find(d => d.id === id);
    if (!data) return LocalDB.toResponse(undefined, 404);
    return LocalDB.toResponse(data);
  }

  public save(table: string, data: Record<string, any>) {
    return LocalDB.toResponse(this.db.save(table, data), 201);
  }

  public update(table: string, id: string, data: Record<string, any>) {
    const d = this.db.update(table, id, data);
    return LocalDB.toResponse(d);
  }

  public delete(table: string, id: string) {
    const data = this.db.get(table);
    if (!data) return LocalDB.toResponse(undefined, 404);
    const newData = data.filter(d => d.id !== id);
    this.db.save(table, newData);
    return LocalDB.toResponse(undefined, 204);
  }

  public deleteAll(table: string) {
    this.db.save(table, {});
    return LocalDB.toResponse(undefined, 204);
  }
}

const localDb = new LocalDB();

export { localDb as LocalDB };
