const {src, dest, watch, parallel} = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const gulp = require("gulp");
const uglify = require('gulp-uglify-es').default
const browserSync = require('browser-sync').create();



function styles(){
    return src('app/scss/*.scss')
        .pipe(concat('style.min.css'))
        .pipe(sass.sync({outputStyle: 'expanded'}))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream())
}
function scripts(){
    return src('app/js/*.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream())
}
function watching(){
    watch('app/scss/**/*.scss', gulp.series(styles));
    watch('app/js/**/**.js', gulp.series(scripts));
    watch(['app/**/*.html']).on('change', browserSync.reload);
}
function brow(){
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
}
function htmlbuild(){
    return src('app/index.html')
        .pipe(dest('dist'))
        .pipe(browserSync.stream())
}
exports.styles = styles;
exports.scripts = scripts;
exports.brow = brow;
exports.watching = watching;

exports.default = parallel(styles, scripts, htmlbuild, brow, watching)