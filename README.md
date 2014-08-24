better-router
=============

The Express Router is almost prefect for modularity. Now it is better.

## Usage

```javascript
var router = require('better-router')([options]);
```

## Differences

- Routers have their own render method. The router has its own `views` and `viewEngine` options so the views directory does not have to exist in any monolithic folder for views. Call `res.routerRender()` instead of `res.render()` for different options, the fucntion signature is the same.

- The mountpath that is purposefully stripped by Express is restored on the router with `router.path()` and set on `res.locals.routerUrl`. 

- `res.locals.routerLink` is a templating helper for making hyperlinks and redirects realtive to and within a router.
