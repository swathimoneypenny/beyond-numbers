module.exports = {
  apps: [
    {
      name: 'bn-auth',
      cwd: '/home/ubuntu/bn-auth',
      script: '/home/ubuntu/bn-auth/.venv/bin/uvicorn',
      args: 'app.main:app --host 127.0.0.1 --port 8010',
      interpreter: 'none',
      autorestart: true,
      max_restarts: 10,
      env: { PYTHONUNBUFFERED: '1' },
    },
  ],
}
