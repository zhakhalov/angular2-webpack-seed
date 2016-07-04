## How to start?

#### Install global dependencies

```
$ npm install tsd -g
```

#### Install local dependencies

```
$ npm install
```

## How to include third-party dependency?
For proper adding of third-party dependency you should `require('<deps-name>')` in `src/dependencies.ts`.
This will move third-party dependencies to separate bundle and reduce re-build time.

## How to work with?

+ Start watch and rebuild source files
  ```
  $ npm run watch
  ```
+ Start livereload server
  ```
  $ npm run serve
  ```
