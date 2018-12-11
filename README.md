# gulp-pkg-json-cleanse

Remove properties from the source __package.json__ file for production.

### Installing

npm
```bash
npm i gulp-pkg-json-cleanse -d
```

yarn

```bash
yarn add gulp-pkg-json-cleanse --dev
```

## Useage
options

```typescript
{
	// string array of package.json
	// properties to remove
	remove: string[];
}
```

gulpfile.js

```
gulp.task('cleanse-pkgjson', () => {
  return gulp.src('package.json')
    .pipe(pkgcleanse({
      remove: [
        'devDependencies'
      ]
    }))
    .pipe(gulp.dest(PROD_DEST));
});
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
