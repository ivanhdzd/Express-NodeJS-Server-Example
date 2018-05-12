# Express NodeJS Server Example

This is a very basic functional Express Server.

It contains some basic security and logs manager 
middlewares.

## Routing

This server is intended for SPAs (Single Page Applications) as Angular, React, VueJS, etc. So that all GET requests redirect to `index.html` file allocated in `public` directory.

## API

This API has this routes:

- GET `/api/v1/hello/:name` => name is a param (Example: http://localhost:3000/api/v1/hello/ivan).
- GET `/api/v1/mock-file` => returns markup mock file data from this Github repository project.

## Configuration

To can run correctly, you need to create a .env file in project root directory with next content:

```bash
PORT=3000
DEV_ENV=true
```