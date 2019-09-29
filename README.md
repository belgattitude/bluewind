# Bluewind 

[![Build Status](https://travis-ci.org/belgattitude/bluewind.svg?branch=master)](https://travis-ci.org/belgattitude/bluewind) [![Greenkeeper badge](https://badges.greenkeeper.io/belgattitude/bluewind.svg)](https://greenkeeper.io/)

 
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
