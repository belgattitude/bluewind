# Bluewind 

[![Build Status](https://travis-ci.org/belgattitude/bluewind.svg?branch=master)](https://travis-ci.org/belgattitude/bluewind) [![Greenkeeper badge](https://badges.greenkeeper.io/belgattitude/bluewind.svg)](https://greenkeeper.io/)

 
## Develop

### Lerna

```bash
$ yarn run bootstrap
```

### Env

Backend 

```bash
$ cp ./apps/api/.env.template ./apps/api/.env
```

Frontend

```bash
$ cp ./apps/web/.env.template ./apps/api/.env
```

And configure those files


### Commands

```bash
$ lerna run typecheck
$ lerna run lint
$ lerna run lint:fix
```
