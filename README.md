# Bluewind 

[![Build Status](https://travis-ci.org/belgattitude/bluewind.svg?branch=master)](https://travis-ci.org/belgattitude/bluewind) 
[![Greenkeeper badge](https://badges.greenkeeper.io/belgattitude/bluewind.svg)](https://greenkeeper.io/)
[![codecov](https://codecov.io/gh/belgattitude/bluewind/branch/master/graph/badge.svg)](https://codecov.io/gh/belgattitude/bluewind)

At this point, it's more a spare-time playground than anything else. 
The ultimate goal is to provide a simple PWA to manage yoga classes, students...

If you're curious, check the [api](./apps/api), [frontend](./apps/web) or more 
interestingly the lerna enabled packages directory, notably [error-flow](./packages/error-flow),
my personal take on a better error handling in typescript.  

 
## Install

```bash
$ yarn install
$ yarn lerna bootstrap  # Lerna bootrap
$ yarn build:packages   # Build deps packages
```

### Set env

Backend 

```bash
$ cp ./apps/api/.env.template ./apps/api/.env
```

Frontend

```bash
$ cp ./apps/web/.env.template ./apps/web/.env
```

And configure those files

### Seed demo data

```bash
$ yarn lerna run --scope bluewind-api db:seed-demo --stream
```

### Start

```bash
$ yarn start:dev
```

### Build

```bash
$ yarn lerna run build
```

### Useful commands

```bash
$ yarn typecheck
$ yarn format
$ yarn lint
$ yarn lint:fix
```
