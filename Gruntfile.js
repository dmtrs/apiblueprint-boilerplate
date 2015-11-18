var nconf = require('./config/index.js');
var util = require('util');

var apiary_path = (nconf.get('apiary:path') || 'dist/apiary.apib');

module.exports = function(grunt){
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    env: {
      dev: {
        APIARY_API_KEY: nconf.get('apiary:key')
      }
    },
    exec: {
      publish: util.format('apiary publish --api-name=%s --path=%s', nconf.get('apiary:name'), apiary_path),
      preview: util.format('apiary preview --server --browser=%s --path=%s &', (nconf.get('apiary:browser') || 'chrome'), apiary_path),
      stop: 'pkill -lf apiary || exit 0'
    },
    concat: {
      options: {
        separator: '\n \n',
      },
      dist: {
        src: ["source/*.apib", "source/*.md"],
        dest: apiary_path
      }
    },
    watch: {
      apiary: {
        files: [ 'source/*.apib' ],
        tasks: [ 'build', 'exec:stop', 'exec:preview' ],
        options: {
          spawn: false,
          livereload: true
        }
      }
    },
    clean: {
      apiary: [ apiary_path ]
    }
  });
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-exec');
  grunt.registerTask('default', [ 'watch:apiary' ]);
  grunt.registerTask('build',   [ 'env:dev', 'clean:apiary', 'concat' ]);
  grunt.registerTask('publish', [ 'build', 'env:dev','exec:publish' ]);
  grunt.registerTask('preview', [ 'build', 'exec:preview' ]);
}                                 
