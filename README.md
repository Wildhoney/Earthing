# 🌕 Earthing

> Discover all of the countries along a walking route from your location by a given heading.

<hr />

![Travis](http://img.shields.io/travis/Wildhoney/Earthing.svg?style=for-the-badge)
&nbsp;
![npm](http://img.shields.io/npm/v/earthing.svg?style=for-the-badge)
&nbsp;
![License MIT](http://img.shields.io/badge/license-mit-lightgrey.svg?style=for-the-badge)
&nbsp;
![Coveralls](https://img.shields.io/coveralls/Wildhoney/Earthing.svg?style=for-the-badge)
&nbsp;
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=for-the-badge)](https://github.com/prettier/prettier)

<img src="media/apple.png" width="150" align="left" alt="Apple Store" />
<img src="media/google.png" width="150" align="left" alt="Google Store" />

<img src="media/screenshot.png" width="200" align="right" alt="Screenshot" />

<br />
<br />

## Setup

Running `yarn` from the root will setup both the React Native app and the Flask API &ndash; however to run using `yarn start` you'll need to `touch .env` with the `API_URL` equal to `http://0.0.0.0:5000` (or an alternative endpoint), and PostgreSQL envs `DB_HOST`, `DB_NAME`, `DB_USERNAME` and `DB_PASSWORD`.
