var gulp = require('gulp')
  , babel = require('gulp-babel')
  , del = require('del')
  , concat = require('gulp-concat')
  , sass = require('gulp-sass')
  , handlebars = require('gulp-handlebars')
  , wrap = require('gulp-wrap')
  , declare = require('gulp-declare')
  , sourcemaps = require('gulp-sourcemaps')
  , paths = {
    scripts: 'src/**/*.js',
    templates: 'src/templates/*.hbs',
    tests: 'tests/**/*.js',
    static: 'static/**',
    bower: 'bower/**',
    sass: 'sass/*.scss'
  };

gulp.task('default', [ 'clean', 'scripts', 'tests', 'templates', 'copy-static', 'copy-bower', 'sass' ], function () {
});

gulp.task('clean', function (done) {
  del('!dist/', done);
});

gulp.task('watch', [ 'default' ], function () {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.tests, ['tests']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.static, ['copy-static']);
  gulp.watch(paths.bower, ['copy-bower']);
});

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
             .pipe(babel({
                "modules": "amd"
              }))
             .pipe(gulp.dest('dist'));
});

gulp.task('tests', function () {
  return gulp.src(paths.tests)
             .pipe(babel({
                "modules": "amd"
              }))
             .pipe(gulp.dest('dist'));
});

gulp.task('templates', function () {
  return gulp.src(paths.templates)
             .pipe(handlebars())
             .pipe(wrap('Handlebars.template(<%= contents %>)'))
             .pipe(declare({
               namespace: 'App.templates',
               noRedeclare: true, // Avoid duplicate declarations
             }))
             .pipe(concat('templates.js'))
             .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
  return gulp.src(paths.sass)
             .pipe(sourcemaps.init())
             .pipe(sass())
             .pipe(concat('app.css'))
             .pipe(sourcemaps.write('.'))
             .pipe(gulp.dest('dist/css'));
});

gulp.task('copy-static', function () {
  return gulp.src(paths.static)
             .pipe(gulp.dest('dist'));
});

gulp.task('copy-bower', function () {
  return gulp.src(paths.bower)
             .pipe(gulp.dest('dist'));
});