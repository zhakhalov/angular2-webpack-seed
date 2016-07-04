import { Component, OnInit, OnDestroy } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

interface LandingParams {
}

interface LandingQuery {
}

@Component({
  template: require('./landing.component.html')
})
class LandingPageComponent implements OnInit, OnDestroy {

  private subs: Subscription[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subs.push(this.route.params.subscribe((params: LandingParams) => this.onParams(params)));
    this.subs.push(this.router.routerState.queryParams.subscribe((query: LandingQuery) => this.onQuery(query)));
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  /**
   * Handle url parmas
   */
  onParams(params: LandingParams) {
  }

  /**
   * Handle querystring params
   */
  onQuery(query: LandingQuery) {
  }

}

export const LandingRoute: Route = {
  component: LandingPageComponent,
  path: ''
};
