module.exports = function(grunt){
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        autoprefixer: {
            options: {
                browsers: ['ios >= 5','android >= 2.3', 'ff >= 32', 'chrome >= 36']
            },
            dist: {
                src: [
                    './css/hammer-drag-map.css',
                ]
            }
        },

        concat: {
            options: {
                separator: '',
            },
            hdm: {
                src: [
                    "./src/hdm-prefix",
                    "./src/input.js",
                    "./src/view.js",
                    "./src/ctrl.js",
                    "./src/exec.js",
                    "./src/hdm-suffix",
                ],
                dest: "./js/hammer-drag-map.js"
            },
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-autoprefixer');

    grunt.registerTask('default',['autoprefixer', 'concat']);
};