import fs from 'fs';

export default class Storage {
  static isFolderExists() {
    return fs.existsSync('./src/utils/local-db/.storage');
  }

  static createFolder() {
    try {
      if (Storage.isFolderExists()) return;
      fs.mkdirSync('./src/utils/local-db/.storage');
    } catch (err) {
      console.error('FS_MODULE:', err);
    }
  }

  static isFileExists(table: string) {
    try {
      return fs.existsSync(`./src/utils/local-db/.storage/${table}.json`);
    } catch (err) {
      console.error('FS_MODULE:', err);
      throw err;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public createFile(table: string) {
    try {
      if (!Storage.isFolderExists()) Storage.createFolder();
      if (Storage.isFileExists(table)) return;
      fs.writeFileSync(`./src/utils/local-db/.storage/${table}.json`, '{}');
    } catch (err) {
      console.error('FS_MODULE:', err);
    }
  }

  static readTable(table: string) {
    try {
      return JSON.parse(
        fs.readFileSync(
          `./src/utils/local-db/.storage/${table}.json`,
          'utf-8',
        ) || '{}',
      ) as Record<string, any>;
    } catch (err) {
      console.error('FS_MODULE:', err);
      throw err;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public save(table: string, _data: Record<string, any>) {
    try {
      const tableData = Storage.readTable(table);
      const id = _data.id ? _data.id : Date.now().toString();

      const data = {
        ..._data,
        id,
      };

      fs.writeFileSync(
        `./src/utils/local-db/.storage/${table}.json`,
        JSON.stringify({ ...tableData, [id]: data }),
      );

      return data;
    } catch (err) {
      console.error('FS_MODULE:', err);
      throw err;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public update(table: string, id: string, _data: Record<string, any>) {
    try {
      const tableData = Storage.readTable(table);
      const row = tableData[id];

      const data = {
        ...row,
        ..._data,
      };

      fs.writeFileSync(
        `./src/utils/local-db/.storage/${table}.json`,
        JSON.stringify({ ...tableData, [id]: data }),
      );
      return data;
    } catch (err) {
      console.error('FS_MODULE:', err);
      throw err;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  public get(table: string) {
    try {
      const d = Storage.readTable(table);

      return Object.values(d).sort(
        (a: Record<string, any>, b: Record<string, any>) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      ) as Record<string, any>[];
    } catch (err) {
      console.error('FS_MODULE:', err);
      throw err;
    }
  }
}
