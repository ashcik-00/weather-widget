const { src, dest, series } = require("gulp");

function moveFiles() {
  return src("src/*.html").pipe(dest("dist"));
}

exports.default = series(moveFiles);
