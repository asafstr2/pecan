module.exports = {
  apps: [
    {
      name: 'Prediction Producer Service',
      script: 'index.js',
      instances: 1,
      autorestart: true,
      exec_mode: "cluster",
      watch: true,
      max_memory_restart: '1G'
    },
    {
      name: 'Prediction Consumer',
      script: 'workers/worker1.js',
      instances: -1,
      watch: true,
    },
  ]
};
