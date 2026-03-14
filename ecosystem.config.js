module.exports = {
  apps: [
    {
      name: 'Front',
      script: './build/server.js',
      env_qa: {     
      exec_mode: 'cluster',
      instances: 1,
      PORT: 21103,
      NODE_ENV: 'production',
      PROTOCOL: 'https',
      
      },
    },
  ],
};