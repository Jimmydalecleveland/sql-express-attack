module.exports = {
  apps: [
    {
      name: 'Attack Roll API',
      script: 'backend/index.js',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: 'one two',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: 'root',
      host: '165.22.155.59',
      ref: 'origin/master',
      repo: 'https://github.com/Jimmydalecleveland/sql-express-attack.git',
      path: '/var/www/app',
      'post-deploy':
        'cd backed && npm install && pm2 reload ecosystem.config.js --env production',
    },
  },
};
