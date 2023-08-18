/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate-plugin')


const nextConfig = {
  development: {
      username: 'new_app',
      password: 'new_app',
      database: 'cadys_db',
      host: '172.19.0.2:5432',
      dialect: 'postgres', // Make sure this is set to 'postgres'
    },
}

module.exports = nextTranslate(nextConfig)
