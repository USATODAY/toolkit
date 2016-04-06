module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            table_viz: {
                src: [
                    'tables/static/tables/dist'
                ]
            }
        },
        cssmin: {
            table_viz: {
                files: {
                    'tables/static/tables/dist/table_viz/table-viz.css': [
                        'common/static/common/libs/bootstrap.custom/bootstrap.min.css',
                        'tables/static/tables/app.css',
                        'tables/static/tables/components/table-viz/table-viz.css',
                        'tables/static/tables/components/responsive-table/responsive-table.css',
                        'tables/static/tables/components/responsive-table/icons.css'
                    ]
                }
            }
        },
        uglify: {
            options: {
                mangle: true
            },
            table_viz: {
                files: {
                    'tables/static/tables/dist/table_viz/table-viz.min.js': [
                        'common/static/common/components/iframe-resizer/iframe-resizer.js',
                        'tables/static/tables/components/table-viz/table-viz.js',
                        'tables/static/tables/components/responsive-table/responsive-table.js'
                    ]
                }
            }
        },
        concat: {
            options: {
                separator: '\n;'
            },
            table_viz_libs: {
                src: [
                    'common/bower_components/angular/angular.min.js',
                    'common/bower_components/angular-touch/angular-touch.min.js'
                ],
                dest: 'tables/static/tables/dist/table_viz/table-viz-libs.min.js'
            }
        },
        copy: {
            table_viz_icons: {
                src: ['tables/static/tables/components/**/fonts/*'],
                dest: 'tables/static/tables/dist/table_viz/fonts',
                expand: true,
                flatten: true
            },
            table_viz_component_html: {
                cwd: 'tables/static/tables/components',
                src: [
                    'responsive-table/*.html',
                    'table-viz/*.html'
                ],
                dest: 'tables/static/tables/dist/table_viz/tables/components',
                expand: true
            }
        },
        fetchpages: {
            table_viz: {
                options: {
                    baseURL: 'http://127.0.0.1:8000/tables/viewer/?use_deployment=true',
                    destinationFolder: 'tables/static/tables/dist/table_viz/',
                    urls: [{
                        url: 'http://127.0.0.1:8000/tables/viewer/?use_deployment=true', localFile: 'index.html'
                    }]
                }
            }
        },
        htmlmin: {
            table_viz_index: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'tables/static/tables/dist/table_viz/index.html': 'tables/static/tables/dist/table_viz/index.html'
                }
            }
        },
        'ftp-deploy': {
            table_viz: {
                auth: {
                    host: 'usatoday.upload.akamai.com',
                    port: 21,
                    authPath: '/Users/plinders/Documents/.ftppass',
                    authKey: 'experiments'
                },
                src: 'tables/static/tables/dist/table_viz/',
                dest: '/17200/experiments/usatoday/responsive/data-tables',
                exclusions: []
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-fetch-pages');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.registerTask('table-viz-build', [
        'clean:table_viz',
        'cssmin:table_viz',
        'uglify:table_viz',
        'concat:table_viz_libs',
        'copy:table_viz_icons',
        'copy:table_viz_component_html',
        'fetchpages:table_viz',
        'htmlmin:table_viz_index'
    ]);
    grunt.registerTask('table-viz-build-deploy', [
        'table-viz-build',
        'ftp-deploy:table_viz'
    ]);
};