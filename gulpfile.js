'use strict';

var gulp = require('gulp');
var imagemin = require('gulp-imagemin'); //- 壓縮圖片
var compass = require('gulp-compass');
var sassGlob = require('gulp-sass-glob');
var concat = require('gulp-concat'); //- 合併檔案
var minifyCSS = require('gulp-minify-css'); //- 壓縮css
var uglify = require('gulp-uglify'); //- 混淆並壓縮
var rename = require("gulp-rename"); //- 重新命名檔案
var jade = require('gulp-jade'); //- 編譯jade
var connect = require('gulp-connect-multi')(); //- liveReload

//- 執行的事件
gulp.task('default', ['imagemin', 'webserver', 'html', 'compass', 'uglify', 'templates', 'watch']);


//- 壓縮圖片
gulp.task('imagemin', () =>
    gulp.src('assets/image/*')
    .pipe(imagemin())
    // .pipe(gulp.dest('assets/image'))
    .pipe(gulp.dest('dist/image'))
);

//- comass-sass
gulp.task('compass', () =>
    gulp.src('assets/sass/*.scss')
    .pipe(compass({
        config_file: 'assets/config.rb',
        css: 'dist/css/',
        sass: 'assets/sass/',
        image: 'assets/image',
        style: 'expanded' //- 壓縮格式nested, expanded, compact, compressed
    }))
    .pipe(gulp.dest('dist/css/'))
    .pipe(connect.reload())
);

//- 壓縮js
gulp.task('uglify', () =>
    gulp.src('assets/js/*.js')
    // .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(rename(function(path) {
        path.basename += ".min"; //- 改變檔名
        path.extname = ".js";
    }))
    .pipe(gulp.dest('dist/js/'))
);

//- jade
gulp.task('templates', () =>
    gulp.src('assets/*.jade')
    .pipe(jade())
    .pipe(gulp.dest('dist/'))
);

//- liveReload
gulp.task('webserver', connect.server({
    root: ['dist'],
    port: 8080,
    livereload: true
}));

gulp.task('html', () =>
    gulp.src('dist/*.html')
    .pipe(connect.reload())
);

//- 監聽的事件
gulp.task('watch', function() {
    gulp.watch(['assets/sass/*.scss', 'assets/sass/*/*.scss'], ['compass']);
    gulp.watch('assets/js/*.js', ['uglify']);
    gulp.watch(['assets/*.jade', 'assets/tmp/*.jade'], ['templates']);
    gulp.watch('dist/*.html', ['html']);
});
