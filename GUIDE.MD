

### Featured languages:

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) 
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Fastify](https://img.shields.io/badge/fastify-%23000000.svg?style=for-the-badge&logo=fastify&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)

### Others:
 

- Zod (Use for validate parameters from request, we can say, used like DTO). 
- Bcrypt (Used for hashing password)

</br>

## Learn how to create an API Access Key.

-  1 - Acess the link: https://apilayer.com/marketplace/exchangerates_data-api and click on "Subscribe for free" </l1>
- 2 -  Create an account if dont have.
- 3 -  Create an Access Key.
- 4  - Add the key in .env.example


After following the steps you will be ready to run the application

## File <strong>.env.example</strong> 

Set your settings and before, rename .env.example for .env
````
DATABASE = mongodb://localhost:27017
ACCESS_KEY = key_from_api_layer
SECRET = yoursecret key
BASE_URL_API = https://api.apilayer.com/exchangerates_data/
````


## Documentation routes

The project use swagger for document endpoints, you can access <strong>/docs</strong> for show the endpoints,
just run the project and access  <strong>/docs</strong> 

HTML DOCUMENTATION:
```bash
http://localhost:3000/docs
```

JSON DOCUMENTATION: 
```bash
http://localhost:3000/docs/json
```

## Running with Docker 

feel free to just run image from app with Docker
```bash
$ docker compose up -d
```

## Instalation


Use NPM for install dependences

```bash
$ npm install
```
<br/>

Done that, build the project
```npm
$ npm run build
```

Ok, ready to start
```npm
$ npm run start
```

If you dont want build, use in mode development:


### Development:

```npm
$ npm run dev
```


<br/>



















