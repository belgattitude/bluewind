# @bluewind/api


## Install

1. Run `npm install` command

2. Create the [`.env`](./.env.template) settings

```bash    
$ cp .env.template .env
$ vi .env
```
> Default sqlite, you can edit to set a different database 
> (i.e: mysql - don't forget to `mysql -u root -p -e 'create database bluewind';` beforehand)                              
                    
   
### Setup the schema

```bash
$ yarn db:install   
```

### Seed the [example data](./scripts/db-seed-example-data.ts)

```bash
$ yarn db:seed-example-data
```    

### Run the tests

    ```bash
   $ npm run test
    ```
      
### Start the server in dev mode

    ```bash
    $ npm run start:dev
    ```

### Point your browser to `http://localhost:3000`

> The server will start on port 3000 by default, see the env to change.

