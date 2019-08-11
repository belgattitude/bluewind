# Bluewind 

[![Build Status](https://travis-ci.org/belgattitude/bluewind.svg?branch=master)](https://travis-ci.org/belgattitude/bluewind) [![Greenkeeper badge](https://badges.greenkeeper.io/belgattitude/bluewind.svg)](https://greenkeeper.io/)

Class booking application (**WIP - early stages**)

API

- [x] Node, NestJS, Typescript
- [x] TypeORM
- [x] Swagger

Frontend

- [x] React, Typescript
- [x] React router
- [x] Redux
- [x] Formik
- [x] Material-ui
 
## Develop

### Lerna

Install lerna globally `npm i -g lerna`, then bootstap the project

```bash
$ lerna bootstrap
```

#### Backend

```bash
$ npm run start:dev --prefix apps/api
```

### Frontend

```bash
$ npm run start --prefix apps/frontend
```


### Commands

```bash
$ lerna run typecheck
$ lerna run lint
$ lerna run lint:fix
```
