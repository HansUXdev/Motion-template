var $        = require('gulp-load-plugins')();
var argv     = require('yargs').argv;
var browser  = require('browser-sync');
var gulp     = require('gulp');
var panini   = require('panini');
var rimraf   = require('rimraf');
var sequence = require('run-sequence');
var sherpa   = require('style-sherpa');
var webpack  = require('webpack-stream');
var imageResize = require('gulp-image-resize');
var rename = require("gulp-rename");
// var imagemin = require('gulp-imagemin');
// var ghPages = require('gulp-gh-pages');

// Check for --production flag
var isProduction = !!(argv.production);

// Port to use for the development server.
var PORT = 8000;

// Browsers to target when prefixing CSS.
var COMPATIBILITY = ['last 2 versions', 'ie >= 9'];

// File paths to various assets are defined here.
var PATHS = {
  assets: [
    'src/assets/**/*',
    'src/assets/css/fonts/**/*',
    '!src/assets/{!img,scss}/**/*'
  ],
  sass: [
    'bower_components/foundation-sites/scss',
    'bower_components/motion-ui/src/'
  ],
  javascript: [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/what-input/what-input.js',
    'bower_components/foundation-sites/js/foundation.core.js',
    'bower_components/foundation-sites/js/foundation.util.*.js',
    // Paths to individual JS components defined below
    'bower_components/foundation-sites/js/foundation.abide.js',
    'bower_components/foundation-sites/js/foundation.accordion.js',
    'bower_components/foundation-sites/js/foundation.accordionMenu.js',
    'bower_components/foundation-sites/js/foundation.drilldown.js',
    'bower_components/foundation-sites/js/foundation.dropdown.js',
    'bower_components/foundation-sites/js/foundation.dropdownMenu.js',
    'bower_components/foundation-sites/js/foundation.equalizer.js',
    'bower_components/foundation-sites/js/foundation.interchange.js',
    'bower_components/foundation-sites/js/foundation.magellan.js',
    'bower_components/foundation-sites/js/foundation.offcanvas.js',
    // Yeah... I'm just going to get rid of this...
    // 'bower_components/foundation-sites/js/foundation.orbit.js',
    'bower_components/foundation-sites/js/foundation.responsiveMenu.js',
    'bower_components/foundation-sites/js/foundation.responsiveToggle.js',
    'bower_components/foundation-sites/js/foundation.reveal.js',
    'bower_components/foundation-sites/js/foundation.slider.js',
    'bower_components/foundation-sites/js/foundation.sticky.js',
    'bower_components/foundation-sites/js/foundation.tabs.js',
    'bower_components/foundation-sites/js/foundation.toggler.js',
    'bower_components/foundation-sites/js/foundation.tooltip.js',
    //
    'bower_components/cta/dist/cta.min.js',
    'bower_components/waypoints/lib/jquery.waypoints.min.js',
    'bower_components/flexslider/jquery.flexslider-min.js',
    
    'vendor/Landio/js/plugins/jquery.vimeo.api.js',
    'vendor/Landio/js/plugins/video.js',
    // ButtonComponentMorph/js/modernizr.custom.js',
      'bower_components/classie/classie.js',
      'vendor/ButtonComponentMorph/js/uiMorphingButton_inflow.js',
      'src/assets/js/morphing-newsletter.js',
    // animated-signup-flow
      'vendor/animated-signup-flow/js/velocity.min.js',
    // 'src/assets/js/**/*.js',
    'src/assets/js/app.js',
    'src/assets/js/signup.js'
  ]
};


// gulp.task('deploy', function() {
//   return gulp.src('./dist/**/**/*')
//     .pipe(ghPages());
// });

// Delete the "dist" folder
// This happens every time a build starts
gulp.task('clean', function(done) {
  rimraf('dist', done);
});

// Copy files out of the assets folder
// This task skips over the "img", "js", and "scss" folders, which are parsed separately
gulp.task('copy', function() {
  return gulp.src(PATHS.assets)
    .pipe(gulp.dest('dist/assets'));
});

// Copy page templates into finished HTML files
gulp.task('pages', function() {
  return gulp.src('src/pages/**/*.{html,hbs,handlebars}')
    .pipe(panini({
      root: 'src/pages/',
      layouts: 'src/layouts/',
      partials: 'src/partials/',
      data: 'src/data/',
      helpers: 'src/helpers/'
    }))
    .pipe(gulp.dest('dist'))
    .on('finish', browser.reload);
});

gulp.task('pages:reset', function(done) {
  panini.refresh();
  gulp.run('pages');
  done();
});

gulp.task('styleguide', function(done) {
  sherpa('src/styleguide/index.md', {
    output: 'dist/styleguide.html',
    template: 'src/styleguide/template.html'
  }, function() {
    browser.reload;
    done();
  });
});

// Compile Sass into CSS
// In production, the CSS is compressed
gulp.task('sass', function() {
  var uncss = $.if(isProduction, $.uncss({
    html: ['src/**/*.html'],
    ignore: [
      new RegExp('.foundation-mq'),
      new RegExp('^\.is-.*')
    ]
  }));

  var minifycss = $.if(isProduction, $.minifyCss());

  return gulp.src('src/assets/scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: COMPATIBILITY
    }))
    .pipe(uncss)
    .pipe(minifycss)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('dist/assets/css'))
    .pipe(browser.reload({ stream: true }));
});

// Combine JavaScript into one file
// In production, the file is minified
gulp.task('javascript', function() {
  var uglify = $.if(isProduction, $.uglify()
    .on('error', function (e) {
      console.log(e);
    }));

  return gulp.src(PATHS.javascript)
    .pipe($.sourcemaps.init())
    .pipe($.concat('app.js'))
    .pipe(uglify)
    .pipe($.if(!isProduction, $.sourcemaps.write()))
    .pipe(gulp.dest('dist/assets/js'))
    .on('finish', browser.reload);
});

// Use Webpack
gulp.task('webpack', function() {
  return gulp.src('src/assets/js/home.js')
    .pipe(webpack())
    .pipe(gulp.dest('dist/'));
});



// Copy images to the "dist" folder
// In production, the images are compressed
gulp.task('images', function() {
  var imagemin = $.if(isProduction, $.imagemin({
    progressive: true
  }));

  return gulp.src('src/assets/img/**/*')
    .pipe(imagemin)
    .pipe(gulp.dest('dist/assets/img'))
    .on('finish', browser.reload);
});


// INTERCHANGE task will dynamically resize all the images and rename them 
// which means you can go tell those non-coder "designers" to get off photoshop
// and go ahead and pickup (s)css.
//    SMALL - 320 
//    MEDIUM - 480 
//    LARGE - 1960
  var allImgs = './src/assets/img/*.{jpeg,jpg,png,svg}';
  var testImgs = './src/assets/img/motion-water-03.jpeg';
  gulp.task('responsive-images', function() {
    gulp.src(allImgs)
      .pipe(imageResize({ width: 920 }))
      .pipe(rename({suffix: '@large'}))
      // .pipe(imagemin({progressive: true}))
      .pipe(gulp.dest('src/assets/img/interchange')) // move this line to before the gulp.dest

    gulp.src(allImgs)
      .pipe(rename({suffix: '@medium'}))
      .pipe(imageResize({ width: 480 }))
      // .pipe(imagemin({progressive: true}))
      .pipe(gulp.dest('src/assets/img/interchange')) 

    gulp.src(allImgs)
      .pipe(rename({suffix: '@small'}))
      .pipe(imageResize({ width: 320 }))
      // .pipe(imagemin({progressive: true}))
      .pipe(gulp.dest('./src/assets/img/interchange'));
  });

  gulp.task('clean-images', function(done) {
    rimraf('src/assets/img/interchange', done);
  });
gulp.task('interchange', function(done) {
  sequence('clean-images', ['responsive-images', 'images'], done);
});

// Build the "dist" folder by running all of the above tasks
gulp.task('build', function(done) {
  sequence('clean', ['pages', 'sass', 'javascript', 'images', 'copy'], 'styleguide', done);
});

// Start a server with LiveReload to preview the site in
gulp.task('server', ['build'], function() {
  browser.init({
    server: 'dist', port: PORT
  });
});

// Build the site, run the server, and watch for file changes
gulp.task('default', ['build', 'server'], function() {
  gulp.watch(PATHS.assets, ['copy']);
  gulp.watch(['src/pages/**/*'], ['pages']);
  gulp.watch(['src/{layouts,partials,helpers,data}/**/*'], ['pages:reset']);
  gulp.watch(['src/assets/scss/**/{*.scss, *.sass}'], ['sass']);
  gulp.watch(['src/assets/js/**/*.js'], ['javascript']);
  gulp.watch(['src/assets/img/**/*'], ['images']);
  gulp.watch(['src/styleguide/**'], ['styleguide']);
});
