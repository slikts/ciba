/* eslint-disable @typescript-eslint/camelcase */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../package.json');

const manifestInput = {
  manifest_version: 2,
  name: 'Sviesta Ciba',
  version: pkg.version,

  icons: {
    '16': 'assets/icons/favicon-16.png',
    '32': 'assets/icons/favicon-32.png',
    '48': 'assets/icons/favicon-48.png',
    '128': 'assets/icons/favicon-128.png',
  },

  description: 'Sviesta Cibas paplašinājums.',
  homepage_url: 'https://github.com/slikts/ciba',
  short_name: 'Ciba',

  permissions: ['storage', 'alarms', 'http://klab.lv/*'],
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",

  '__chrome|firefox__author': 'slikts',
  __opera__developer: {
    name: 'slikts',
  },

  __firefox__applications: {
    gecko: { id: '{754FB1AD-CC3B-4856-B6A0-7786F8CA9D17}' },
  },

  __chrome__minimum_chrome_version: '49',
  __opera__minimum_opera_version: '36',

  browser_action: {
    default_popup: 'popup.html',
    default_icon: {
      '16': 'assets/icons/favicon-16.png',
      '32': 'assets/icons/favicon-32.png',
      '48': 'assets/icons/favicon-48.png',
      '128': 'assets/icons/favicon-128.png',
    },
    default_title: 'Sviesta Ciba',
    '__chrome|opera__chrome_style': false,
    __firefox__browser_style: false,
  },

  '__chrome|opera__options_page': 'options.html',

  options_ui: {
    page: 'options.html',
    open_in_tab: true,
    __chrome__chrome_style: false,
  },

  background: {
    scripts: ['js/background.bundle.js'],
    '__chrome|opera__persistent': false,
  },

  content_scripts: [
    {
      matches: ['http://klab.lv/*'],
      js: ['js/contentScript.bundle.js'],
    },
  ],
};

module.exports = manifestInput;