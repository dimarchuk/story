const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    authoPrefixer = require('gulp-autoprefixer'),
    cssmin = require('gulp-clean-css'),
    rigger = require('gulp-rigger'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    del = require('del');
let reload = browserSync.reload;

let path = {

    dist: {
        html: 'dist/',
        js: 'dist/js/',
        css: 'dist/css/',
        img: 'dist/img/',
        fonts: 'dist/fonts/'
    },

    src: {
        html: 'src/*.html',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },

    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        css: 'src/style/**/*.sass',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },

    clean: './dist'
};

let config = {

    server: {
        baseDir: "./dist"
    },
    tunnel: true,
    host: 'www.blog.com',
    port: '9000',
    logPrefix: "Frontend"
};

gulp.task('webserver', function () {
    browserSync(config);
});


gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.dist.html))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.js))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(authoPrefixer())
        // .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.dist.css))
        .pipe(reload({
            stream: true
        }));
});

gulp.task('fonts:build', function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.dist.fonts))
});

gulp.task('img:build', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.dist.img))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'img:build'
]);

gulp.task('watch', function () {
    gulp.watch(path.src.js, ['js:build']);
    gulp.watch('src/style/**/*.scss', ['style:build']);
    gulp.watch(path.src.html, ['html:build']);
});

gulp.task('clean', function () {
    return del.sync('dist');
});

gulp.task('default', ['clean', 'build', 'webserver', 'watch']);