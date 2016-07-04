import { Component } from '@angular/core';
import { Route } from '@angular/router';

@Component({
  template: require('./notFound.component.html')
})
class NotFoundPageComponent { }

export const NotFoundRoute: Route = {
  component: NotFoundPageComponent,
  path: '**'
};
