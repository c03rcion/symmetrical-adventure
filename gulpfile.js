var gulp = require('gulp');
var bs = require('browser-sync').create();
var nunjucksRender = require('gulp-nunjucks-render');
var sass = require('gulp-sass');

gulp.task('browser-sync', function(){
  bs.init({
    server: {
      baseDir: "distribution"
    }
  });
});

gulp.task('nunjucks', function(){
  return gulp.src('app/pages/**/*.+(html|nunjucks)')
    .pipe(nunjucksRender({
      path: ['app/templates']
    }))
    .pipe(gulp.dest('distribution'))
    .pipe(bs.reload({stream:true}));
  });

gulp.task('sass', function(){
  return gulp.src('app/src/stylesheets/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('distribution/build/stylesheets'))
    .pipe(bs.reload({stream:true}));
});

gulp.watch('app/src/stylesheets/*.scss', ['sass']);
gulp.watch("app/pages/*.nunjucks", ['nunjucks']);
gulp.watch("app/templates/*.nunjucks", ['nunjucks']);
// gulp.watch("app/templates/macros/*.nunjucks", ['nunjucks']);
gulp.watch("app/templates/partials/*.nunjucks", ['nunjucks']);
gulp.watch('*.html').on('change', bs.reload);
