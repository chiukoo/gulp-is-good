'use strict';

var gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    sass = require('gulp-sass'),
    sassGlob = require('gulp-sass-glob'),
    minifyCSS = require('gulp-minify-css');


//編譯sass
gulp.task('gulp-scss', function () {
    return gulp
        .src('./src/sass/*.scss')
        .pipe(sassGlob())
        .pipe(sass())
        .pipe(gulp.dest('dist/css'));
});

//壓縮css
gulp.task('minify-css', function() {
  return gulp.src('./src/css/*.css')
    .pipe(minifyCSS({keepBreaks:true}))
    .pipe(gulp.dest('dist/css'))
});

//壓縮圖片
gulp.task('gulp-imagemin', () =>
    gulp.src('./src/image/*')   //來源資料夾
        .pipe(imagemin())
        .pipe(gulp.dest('dist/image')) //目標資料夾, 如需覆蓋則指定跟來源相同
);


//要執行的事件
gulp.task('default',['gulp-scss', 'minify-css', 'gulp-imagemin']);