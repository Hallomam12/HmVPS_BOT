const path = require('path');

module.exports = {
  BOT_SETTINGS: {
    TOKEN: 'PASTE_YOUR_TELEGRAM_BOT_TOKEN_HERE',
    POLLING: true,
    ADMIN_IDS: [123456789] // ganti dengan Telegram ID kamu
  },

  DATABASE_PATHS: {
    PANELS: path.join(__dirname, 'database', 'panels.json'),
    USERS: path.join(__dirname, 'database', 'users.json')
  },

  DO_SETTINGS: {
    DEFAULT_REGION: 'sgp1',
    DEFAULT_SIZE: 's-1vcpu-1gb',
    DEFAULT_IMAGE: 'ubuntu-22-04-x64',
    DEFAULT_USERNAME: 'root',
    DEFAULT_PASSWORD: 'CHANGE_ME',

    REGIONS: {
      singapore: 'sgp1',
      jakarta: 'jkt1',
      india: 'blr1',
      tokyo: 'tyo1',
      london: 'lon1',
      frankfurt: 'fra1',
      newyork: 'nyc1',
      sanfrancisco: 'sfo1'
    },

    OS_IMAGES: {
      ubuntu22: 'ubuntu-22-04-x64',
      ubuntu20: 'ubuntu-20-04-x64',
      ubuntu18: 'ubuntu-18-04-x64',
      debian11: 'debian-11-x64',
      debian10: 'debian-10-x64',
      centos9: 'centos-9-x64',
      centos8: 'centos-stream-8-x64',
      fedora: 'fedora-37-x64',
      rocky9: 'rockylinux-9-x64'
    },

    SIZES: {
      '1gb-intel': 's-1vcpu-1gb',
      '1gb-amd': 's-1vcpu-1gb-amd',
      '2gb-intel': 's-1vcpu-2gb',
      '2gb-amd': 's-1vcpu-2gb-amd',
      '4gb-intel': 's-2vcpu-4gb',
      '4gb-amd': 's-2vcpu-4gb-amd',
      '8gb-intel': 's-4vcpu-8gb',
      '8gb-amd': 's-4vcpu-8gb-amd',
      '16gb-intel': 's-8vcpu-16gb',
      '16gb-amd': 's-8vcpu-16gb-amd'
    },

    CPU_TYPES: {
      intel: 'Intel',
      amd: 'AMD'
    }
  },

  PANEL_SETTINGS: {
    MAX_PANELS_PER_USER: 5,
    DEFAULT_PANEL_NAME: 'Panel'
  }
};
