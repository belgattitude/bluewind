# Qinterview frontend

> Took the opportunity of the interview to use hooks 
> instead of class based components.     
>  
> The webpack setup has been adapted from a code I wrote more than a year ago, so
> there might be few extra stuffs. Don't get distracted.  
>

# Gif

![image](./docs/images/qover-frontend.gif)


- [x] Typescript *(strict mode)*
- [x] React (use of hooks)
- [x] Redux (use of Immer)
- [x] React Router
- [x] Formik 
- [x] SCSS for styling
- [x] Webpack
- [x] ts-lint / prettier

## Install

1. Run `npm install` command

2. Create the [`.env`](./.env.template) settings

    ```bash    
    $ cp .env.template .env
    $ vi .env
    ```                    
         
3. Start the webpack server

    ```bash
    $ npm run start
    ```

4. Point your browser to `http://localhost:3001`


> The webpack dev server will start on port 3001 by default

## Project structure

> Project structure is basic, deserves better care.

| Directory;           | Note                                   |
| ---------------------| -------------------------------------- |
| `src/assets/images`  |                                        |
| `src/assets/sass`    | Global styles                          |
| `src/components`     | Common components: layout, header...   | 
| `src/features`       |                                        |

## Conventions

> Set few file extensions to help:
>    - `*.api.ts`:  Code for api requests 
>    - `*.ducks.ts`: Redux reducers, actions... when exists  
>    - `*.form.tsx`: Form components
>    - `*.page.tsx`: Entry point for the router (~ presentation)
>    - `*.page.scss`: SASS files
>    - `*.test.ts`: test files   

## Routes

| Path      | Protected | 
| --------- | --------- | 
| `/`       |           | 
| `/login`  |           | 
| `/profile`| Yes       | 





    


