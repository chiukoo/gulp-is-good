'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin'); //- 壓縮圖片
var compass = require('gulp-compass');
var concat = require('gulp-concat'); //- 合併檔案
var minifyCSS = require('gulp-minify-css'); //- 壓縮css
var uglify = require('gulp-uglify'); //- 混淆並壓縮
var rename = require("gulp-rename"); //- 重新命名檔案
var jade = require('gulp-jade');
var webserver = require('gulp-webserver');

//- 壓縮圖片
gulp.task('imagemin', () =>
    gulp.src('assets/image/*') //來源資料夾
    .pipe(imagemin())
    .pipe(gulp.dest('dist/image')) //目標資料夾, 如需覆蓋則指定跟來源相同
);

//- comass-sass
gulp.task('compass', function() {
    return gulp.src('./assets/sass/*.scss')
        .pipe(compass({
            sourcemap: true,
            time: true,
            css: 'assets/css/',
            sass: 'assets/sass/',
            image: 'assets/image',
            style: 'compressed' //- 壓縮格式nested, expanded, compact, compressed
        }))
        .pipe(gulp.dest('dist/css/'));
});

//- 合併js
gulp.task('uglify', function() {
    return gulp.src('assets/js/*.js')
        .pipe(uglify())
        .pipe(rename(function(path) {
            // path.basename += ".min";  //- 改變檔名
            path.extname = ".js";
        }))
        .pipe(gulp.dest('dist/js/'));
});

//- jade
gulp.task('templates', function() {
  var YOUR_LOCALS = {};

  gulp.src('./assets/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('webserver', function() {
  gulp.src('dist/')
    .pipe(webserver({
      port: 8080,
      livereload: true,
      directoryListing: false,
      open: true,
      fallback: '*'
    }));
});

//- 監聽的事件
gulp.task('watch', function() {
    gulp.watch('assets/sass/*.scss', ['compass']);
    gulp.watch('assets/js/*.js', ['uglify']);
    gulp.watch('assets/*.jade', ['templates']);
});

//- 執行的事件
gulp.task('default', ['webserver', 'templates', 'imagemin', 'compass', 'uglify', 'watch']);
