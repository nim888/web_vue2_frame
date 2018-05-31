const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const del = require('del');

const $ = gulpLoadPlugins();

const webpack = require('webpack');
const webpackConfig = require('./webpack.production.config');

const config = {
    srcDir: 'src/', //源文件目录
    distDir: 'dist/', //编译后产物目录
    tmpDir: '.tmp/', //临时目录
    testDir: 'test/', //测试目录
    //prefix:'../../',
    prefix: '',
    prefix: '',
    prefix: '',
    prefix: '',
    prefix: '',
    prefix: '',
    staticServe: {
        port: 9000
    }
}

const qiniuCfg = {
    accessKey: 'l3_zEuFBjQ04UIKPb5kp-ZazM7x7MStJORLevqi7',
    secretKey: 'Q52wqmx4h4NRlULO97cZtkFh1Jae5We_rGLRu6nb',
    bucket: 'static-isonli'
}

gulp.task('publish', () => {
    return gulp.src([
            '*.*'
        ], {
            cwd: config.distDir
        })
        .pipe($.qiniu({
            accessKey: qiniuCfg.accessKey,
            secretKey: qiniuCfg.secretKey,
            bucket: qiniuCfg.bucket,
            private: false
        }));
});

gulp.task('html', () => {
    const assets = $.useref.assets({
        searchPath: [config.tmpDir],
        transformPath(filePath) {
            return filePath
        }
    });

    return gulp.src(['views/*.html'])
        .pipe(assets)
        .pipe($.rev())
        .pipe(gulp.dest(config.distDir))
        .pipe(assets.restore())
        .pipe($.useref())
        .pipe($.revReplace({
            prefix: config.prefix
        }))
        .pipe($.filter('*.html'))
        .pipe(gulp.dest('views'));
});

gulp.task('webpack', (callback) => {
    webpack(
        webpackConfig,
        function(err, status) {
            if (err) {
                console.err('webpack ERR: ' + err)
            }
            callback && callback()
        });
});

gulp.task('copy:html', () => {
    return gulp.src(`${config.distDir}/src/views/*.html`)
        .pipe(gulp.dest(config.distDir))
        .on('end', _ => del(`${config.distDir}/src`));
});

gulp.task('clean:pre', del.bind(null, [
    config.tmpDir,
    config.distDir,
    'views'
]));

gulp.task('build', ['clean:pre', 'webpack'], () => {
    gulp.start('copy:html');
    //gulp.start('publish');
});