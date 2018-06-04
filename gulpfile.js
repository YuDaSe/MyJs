(function () {
  'use strict';

  const gulp = require('gulp');

  // html
  const htmlmin = require('gulp-htmlmin');
  const templateCache = require('gulp-angular-templatecache');

  // utils
  const del = require('del');
  const gulpReplace = require('gulp-replace');
  const runSequence = require('run-sequence');
  const concat = require('gulp-concat');
  const merge = require('merge-stream');
  const sourcemaps = require('gulp-sourcemaps');
  const filesExist = require('files-exist');
  const babel = require('gulp-babel');
  const exec = require('child_process').exec;

  // source
  const PACKAGES_STATIC_BASE = './packages';
  const ROOT_STATIC_BASE = `${PACKAGES_STATIC_BASE}/angularjs/`;
  const NG_ROOT_STATIC_BASE = `${PACKAGES_STATIC_BASE}/ng-atiim/`;
  const ROOT_STATIC_ATIIM = ROOT_STATIC_BASE + 'src/';
  const NODE_STATIC_BASE = ROOT_STATIC_BASE + 'node_modules/';

  // target
  const ROOT_DIST = './dist/';
  const TEMP_BUILD_FOLDER = ROOT_DIST + '/tmp/';
  const TEMP_BUILD_FOLDER_JS = TEMP_BUILD_FOLDER + 'js/';

  // tasks implementations
  const tasks = {

    clean: function () {
      return del([
        ROOT_DIST
      ]);
    },

    clean_temp: function () {
      return del([
        TEMP_BUILD_FOLDER
      ]);
    },

    copy_temp_js: function () {
      const nodeCommonModules = (function () {
        return gulp.src(filesExist([
          NODE_STATIC_BASE + 'jquery/dist/jquery.min.js',
          NODE_STATIC_BASE + 'pubsub-js/src/pubsub.js',
        ]))
          .pipe(sourcemaps.init())
          .pipe(concat('node-common.js'))
          .pipe(gulp.dest(TEMP_BUILD_FOLDER_JS))
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest(TEMP_BUILD_FOLDER_JS));
      })();

      const nodeAngularModules = (function () {
        return gulp.src(filesExist([
          NODE_STATIC_BASE + 'angular/angular.js',
          NODE_STATIC_BASE + 'angular-route/angular-route.min.js',
        ]))
          .pipe(sourcemaps.init())
          .pipe(concat('node-angular.js'))
          .pipe(gulp.dest(TEMP_BUILD_FOLDER_JS))
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest(TEMP_BUILD_FOLDER_JS));
      })();

      const angularJS = (function () {
        return gulp.src(filesExist([
          ROOT_STATIC_ATIIM + 'app.js',
          ROOT_STATIC_ATIIM + 'controllers/*.js',
          ROOT_STATIC_ATIIM + 'components/*.js',
          ROOT_STATIC_ATIIM + 'services/*.js',
          ROOT_STATIC_ATIIM + 'routes/*.js'
        ]))
          .pipe(sourcemaps.init())
          .pipe(babel({
            presets: ['env']
          }))
          .pipe(gulpReplace(/^'use strict';\n/, ''))
          .pipe(concat('atiim-all.js'))
          .pipe(gulp.dest(TEMP_BUILD_FOLDER_JS))
          .pipe(sourcemaps.write('./'))
          .pipe(gulp.dest(TEMP_BUILD_FOLDER_JS));
      })();

      return merge(
        nodeCommonModules,
        nodeAngularModules,
        angularJS
      );
    },

    templatecache: function () {
      return gulp.src(filesExist([
        ROOT_STATIC_ATIIM + 'templates/**/*.html'
      ]))
        .pipe(htmlmin({
          collapseWhitespace: true,
          removeComments: true,
        }))
        .pipe(templateCache('template-cache.js', {
          module: 'demo-app',
        }))
        .pipe(gulp.dest(TEMP_BUILD_FOLDER_JS));
    },

    concat_js: function () {
      return gulp.src([
        `${TEMP_BUILD_FOLDER_JS}node-common.js`,
        `${TEMP_BUILD_FOLDER_JS}node-angular.js`,
        `${TEMP_BUILD_FOLDER_JS}atiim-all.js`,
        `${TEMP_BUILD_FOLDER_JS}template-cache.js`,
      ])
        .pipe(concat('all.js'))
        .pipe(gulp.dest(ROOT_DIST));
    },

    ng_build: function (done) {
      var cwd = process.cwd();
      process.chdir(NG_ROOT_STATIC_BASE);
      exec('ng build --prod --output-hashing bundles --sourcemap false', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);

        process.chdir(cwd);
        done();
      });
    },

    ng_assets: function () {
      return gulp.src(filesExist([
        NG_ROOT_STATIC_BASE + 'dist/*.+(png|gif)',
      ]), {
        base: NG_ROOT_STATIC_BASE + 'dist'
      })
        .pipe(gulp.dest(ROOT_DIST + '/static/css'));
    },

    ng_gather: function () {
      const ng_js = (function () {
        return gulp.src(filesExist([
          NG_ROOT_STATIC_BASE + 'dist/scripts.*.bundle.js',
          NG_ROOT_STATIC_BASE + 'dist/inline.*.bundle.js',
          NG_ROOT_STATIC_BASE + 'dist/polyfills.*.bundle.js',
          NG_ROOT_STATIC_BASE + 'dist/main.*.bundle.js',
        ], {
          throwOnMissing: false,
        }))
          .pipe(concat('ng-atiim.min.js'))
          .pipe(gulp.dest(`${ROOT_DIST}templates/static/js`));
      })();

      const ng_chunks = (function () {
        return gulp.src(`${NG_ROOT_STATIC_BASE}dist/*.chunk.js`)
          .pipe(gulp.dest(`${ROOT_DIST}templates/static/js`));
      })();

      const ng_css = (function () {
        return gulp.src(filesExist([
          NG_ROOT_STATIC_BASE + 'dist/styles.*.bundle.css',
        ], {
          throwOnMissing: false
        }))
          .pipe(concat('ng-atiim.min.css'))
          .pipe(gulp.dest(`${ROOT_DIST}templates/static/css`));
      })();

      return merge(ng_js, ng_chunks, ng_css);
    },
  };

  // register all the tasks
  gulp.task('clean', tasks.clean);
  gulp.task('clean_temp', tasks.clean_temp);
  gulp.task('templatecache', tasks.templatecache);
  gulp.task('copy_temp_js', tasks.copy_temp_js);
  gulp.task('concat_js', tasks.concat_js);

  // Angular application build
  gulp.task('ng_build', tasks.ng_build);
  gulp.task('ng_assets', tasks.ng_assets);
  // gulp.task('ng_gather', ['ng_assets'], tasks.ng_gather);

  gulp.task('oldbuild', function (callback) {
    // running all commands sequentially to fail workflow
    // if one of steps failed
    runSequence(
      'clean',
      'copy_temp_js',
      'templatecache',
      // copy angular(5) assets
      // 'ng_gather',
      'concat_js',
      'clean_temp',
      callback);
  });

  gulp.task('build', function (callback) {
    // running all commands sequentially to fail workflow
    // if one of steps failed
    runSequence(
      // build angular(5) application
      'ng_build',
      // old application build
      'oldbuild',
      callback);
  });
})();
