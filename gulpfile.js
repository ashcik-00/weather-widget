const { src, dest, series } = require("gulp");
const minify = require("gulp-uglify");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");

function minifyCss() {
  return src("src/*.css")
    .pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(dest("dist"));
}

function minifyJS() {
  return src("src/*.js")
    .pipe(sourcemaps.init())
    .pipe(minify())
    .pipe(sourcemaps.write())
    .pipe(dest("dist"));
}

function moveFiles() {
  return src("src/*.html").pipe(dest("dist"));
}

exports.default = series(moveFiles, minifyCss, minifyJS);
