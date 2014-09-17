module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Vendor Prefix CSS
    // =====================================
    autoprefixer: {
      target: {
        src: './src/css/*.css'
      }
    },


    // Deletes build folder
    // =====================================
    clean: {
      dev: {
        src: [ './build/dev' ]
      },
      prod: {
        options: {
          force: true
        },
        src: [ '../fb-resources-prod/*']
      },
    },


    // Run watch and webserver at same time
    // =====================================
    concurrent: {
      dev: {
        tasks: ['watch', 'connect'],
        options: {
          logConcurrentOutput: true
        }
      }
    },


    // Development webserver
    // =====================================
    connect: {
      dev: {
        options: {
          port: 4000,
          base: './build/dev',
          keepalive: true
        }
      }
    },


    // Copy Sass File to Build w/o Jekyll
    // =====================================
    copy: {
      css: {
        src: './src/css/styles.css',
        dest: './build/dev/css/styles.css',
      },
    },


    // Build Site w/ Jekyll
    // =====================================
    jekyll: {
      dev: {
        options: {
          src: './src',
          dest: './build/dev'
        }
      },
      prod: {
        options: {
          src: './src',
          dest: '../fb-resources-prod'
        }
      }
    },


    // Build Sass Files
    // =====================================
    sass: {
      dev: {
        files: {
            './src/css/styles.css': './src/css/styles.sass'
        }
      },
      prod: {
        options: {
            style: 'compressed'
        },
        files: {
            './src/css/styles.css': './src/css/styles.sass'
        }
      }
    },


    // Keep an eye out for changes
    // =====================================
    watch: {
      css: {
        files: ['./src/css/**/*.s*ss'],
        tasks: ['sass', 'autoprefixer', 'copy'],
        options: {
          spawn: false,
        }
      },
      jekyll: {
        files: ['./src/**/*.html', './src/**/*.md', './src/**/*.js', './src/**/*.yml'],
        tasks: ['jekyll:dev'],
        options: {
          spawn: false,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jekyll');

  grunt.registerTask('dev', ['clean:dev', 'sass:dev', 'autoprefixer', 'jekyll:dev', 'concurrent:dev']);
  grunt.registerTask('prod', ['clean:prod', 'sass:prod', 'autoprefixer', 'jekyll:prod']);

};
