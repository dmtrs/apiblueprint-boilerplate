var nconf = require('./config/index.js');
var util = require('util');

var apiary_path = (nconf.get('apiblueprint:path') || 'dist/apiary.apib');

module.exports = function(grunt){
  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    env: {
      dev: {
        APIARY_API_KEY: nconf.get('apiblueprint:apiary:key')
      }
    },
    exec: {
      publish: util.format('apiary publish --api-name=%s --path=%s', nconf.get('apiblueprint:name'), apiary_path),
      preview_start: util.format('apiary preview --server --browser=%s --path=%s &', (nconf.get('apiblueprint:browser') || 'chrome'), apiary_path),
      preview_stop: 'pkill -lf apiary || exit 0',
      mock_start: util.format('drakov -f "%s" -p %s &', apiary_path, (nconf.get('apiblueprint:mock:port') || 3040)),
      mock_stop: 'pkill -lf drakov || exit 0'
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
        tasks: [ 'preview', 'mock' ],
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
  grunt.registerTask('default', [ 'preview', 'mock', 'watch:apiary' ]);
  grunt.registerTask('build',   [ 'env:dev', 'clean:apiary', 'concat' ]);
  grunt.registerTask('publish', [ 'build', 'env:dev','exec:publish' ]);
  grunt.registerTask('preview', [ 'build','exec:preview_stop', 'exec:preview_start' ]);
  grunt.registerTask('mock',    [ 'build','exec:mock_stop', 'exec:mock_start' ]);
}                                 
