import { createPool, Pool } from 'mysql';
import Logger from '@faasjs/logger';

class ProviderMysql {
  public pool: Pool;
  public logger: Logger;

  constructor (opts: {
    resource: {
      config: {
        host: string;
        user: string;
        password: string;
        database: string;
        [key: string]: any;
      };
      [key: string]: any;
    };
    [key: string]: any;
  }) {
    this.logger = new Logger('@faasjs/provider-mysql');

    const config = Object.assign({
      connectionLimit: 1,
      port: 3306
    }, opts.resource.config);

    this.logger.debug('createPool: %o', config);
    this.pool = createPool(config);
  }

  public query (sql: string, values: any) {
    this.logger.debug('query begin: %s %o', sql, values);
    this.logger.time(sql);

    return new Promise((resolve, reject) => {
      this.pool.query(sql, values, (error, results) => {
        this.logger.timeEnd(sql, 'query end: %s %o', sql, results);
        if (error) {
          reject(error);
        }
        resolve(results);
      });
    });
  }

  public execute (sql: string, values: any) {
    this.logger.debug('execute begin: %s %o', sql, values);
    this.logger.time(sql);

    return new Promise((resolve, reject) => {
      this.pool.query(sql, values, (error, results, fields) => {
        this.logger.timeEnd(sql, 'execute end: %s %o', sql, fields);
        if (error) {
          reject(error);
        }
        resolve(fields);
      });
    });
  }
}

export default function (opts: {
  resource: {
    config: {
      host: string;
      user: string;
      password: string;
      database: string;
      [key: string]: any;
    };
    [key: string]: any;
  };
  [key: string]: any;
}) {
  return new ProviderMysql(opts);
}
