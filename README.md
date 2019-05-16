# @faasjs/provider-mysql

Mysql 适配

[![License: MIT](https://img.shields.io/npm/l/@faasjs/provider-mysql.svg)](https://github.com/faasjs/provider-mysql/blob/master/LICENSE)
[![Build Status](https://img.shields.io/travis/com/faasjs/provider-mysql.svg)](https://travis-ci.com/faasjs/provider-mysql)
[![Coverage Status](https://img.shields.io/codecov/c/github/faasjs/provider-mysql.svg)](https://codecov.io/gh/faasjs/provider-mysql)
[![NPM Stable Version](https://img.shields.io/npm/v/@faasjs/provider-mysql/stable.svg)](https://www.npmjs.com/package/@faasjs/provider-mysql)
[![NPM Beta Version](https://img.shields.io/npm/v/@faasjs/provider-mysql/beta.svg)](https://www.npmjs.com/package/@faasjs/provider-mysql)

[接口文档](https://github.com/faasjs/provider-mysql/blob/master/API.md)

## How to use?

1. Add npm to package.json: `yarn add @faasjs/provider-mysql@beta`;
2. Config connection info in providers folder, support host, user, password and database;
3. Use it in flow:

```typescript
new Flow({
  resources: {
    mysql: {}
  }
}, async function(){
  const results = await this.mysql.query('SELECT user from id = ?', ['1']);
  console.log(results[0].id); // => 1
})
```