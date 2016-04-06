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
            }
        }
        // htmlmin: {
        //     options: {
        //         removeComments: true,
        //         collapseWhitespace: true
        //     },
        //     component_html: {
        //         cwd: 'components',
        //         src: [
        //             '**/*.html'
        //         ],
        //         dest: 'dist/components',
        //         expand: true
        //     },
        //     index: {
        //         files: {
        //             'dist/index.html': 'dist/index.html'
        //         }
        //     }
        // },
        // 'ftp-deploy': {
        //     build: {
        //         auth: {
        //             host: 'usatoday.upload.akamai.com',
        //             port: 21,
        //             authPath: '/Users/plinders/Documents/.ftppass',
        //             authKey: 'experiments'
        //         },
        //         src: 'dist',
        //         dest: '/17200/experiments/usatoday/responsive/candidate-tax-calculator',
        //         exclusions: []
        //     }
        // }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    // grunt.loadNpmTasks('grunt-contrib-htmlmin');
    // grunt.loadNpmTasks('grunt-ftp-deploy');
    grunt.registerTask('table-viz', ['clean:table_viz', 'cssmin:table_viz', 'uglify:table_viz', 'concat:table_viz_libs', 'copy:table_viz_icons']);
};