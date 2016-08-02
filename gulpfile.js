// 引入 gulp
var gulp = require("gulp");

// 引入组件
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var uglify = require("gulp-uglify");
var imagemin = require("gulp-imagemin");
var minifycss = require("gulp-minify-css");
var htmlmin = require("gulp-htmlmin");
var browserSync = require("browser-sync");

// css 任务
gulp.task("styles", function () {
    gulp.src("src/css/*.css")
        .pipe(concat("style.css"))
        .pipe(minifycss())
        .pipe(rename({ suffix: ".min" }))
        .pipe(gulp.dest("dist/css/"));
});

// 脚本
gulp.task("scripts", function () {
    gulp.src("src/js/*.js")
        .pipe(concat("main.js"))
        .pipe(rename({ suffix: ".min" }))
        .pipe(uglify())
        .pipe(gulp.dest("dist/js/"));
});

// HTML任务
gulp.task("html", function () {
    var options = {
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeComments: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true
    };
    gulp.src("src/*.html")
        .pipe(htmlmin(options))
        .pipe(gulp.dest("dist/"));
});

// 实时更新视图，自动刷新页面
gulp.task("server", ["styles", "scripts", "html"], function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });
    // 监听文件变化，实时刷新页面
    gulp.watch("src/css/*.css", ["styles"]);
    gulp.watch("src/js/*.js", ["scripts"]);
    gulp.watch("src/*.html", ["html"]);
    gulp.watch("dist/*.html").on("change", browserSync.reload);
});

// 默认任务
gulp.task("default", ["server"]);
