const {src, dest, series, watch} = require('gulp')

const sass = require('gulp-sass')(require("sass"))
const csso = require('gulp-csso')
const autoprefixer = require('gulp-autoprefixer')
const concat = require('gulp-concat')
const clean = require('gulp-clean')
const sync = require('browser-sync').create()

function html() {
  return src('src/**/*.html')
    .pipe(dest('dist'))
}

function compileSass() {
  return src(['src/scss/starter-kit.scss'])
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ["last 2 version"]
    }))
    .pipe(dest('dist'))
    .pipe(csso())
    .pipe(concat('starter-kit.min.css'))
    .pipe(dest('dist'))
}

function clear() {
  return src('dist', {read: false})
    .pipe(clean())
}

function serve() {
  sync.init({
    server: './dist'
  })

  watch('src/**/*.html', series(html)).on('change', sync.reload);
  watch('src/**/*.scss', series(compileSass)).on('change', sync.reload);
}

exports.serve = series(clear, compileSass, html, serve);

exports.clear = clear