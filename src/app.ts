/// <reference path="typings/typings.d.ts" />
import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { AppRoutes } from './router.config';

require('./app.less');
require('./app.scss');

bootstrap(AppComponent, [
  ROUTER_DIRECTIVES,
  AppRoutes
])
  .catch(err => console.log(err));