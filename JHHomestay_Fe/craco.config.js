// craco.config.js
module.exports = {
    style: {
      postOptionss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
  }