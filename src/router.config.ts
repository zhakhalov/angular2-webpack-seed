import { provideRouter, RouterConfig } from '@angular/router';

import { LandingRoute } from './pages/landing/landing.component';
import { NotFoundRoute } from './pages/notFound/notFound.component';

/**
 * Routing configurations.
 */
export const AppRoutes = provideRouter([
  LandingRoute,
  // not found page should go at the end.
  NotFoundRoute,
]);