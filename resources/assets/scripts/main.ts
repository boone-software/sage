import * as $ from 'jquery';
(<any>window).jQuery = $;

import Router from './util/Router';

import about from './routes/about';
import common from './routes/common';
import home from './routes/home';

import './autoload/bootstrap';

const routes = new Router({
  about,
  common,
  home
});

document.addEventListener('DOMContentLoaded', () => routes.loadEvents());
