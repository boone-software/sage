import { camelCase } from 'lodash';

export interface Route {
  init: Function,
  finalize: Function
}

export interface Routes {
  [key: string]: Route
}

export default class Router {
  /**
   * Collection of routes.
   *
   * @type {object} routes
   */
  private routes: Routes;

  /**
   * Constructor for Router.
   *
   * @param {object} routes
   */
  constructor(routes: Routes) {
    this.routes = routes;
  }

  /**
   * Fire router events.
   *
   * @param {string} route DOM-based route derived from body classes (`<body class="...">`).
   * @param {string} event Events on the route. By default, `init` and `finalize` events are called.
   * @param {mixed} arg Any custom argument to be passed to the event.
   */
  fire(route: string, event: string = 'init', arg?: any) {
    if (route !== '' && this.routes[route] && typeof this.routes[route][event] === 'function') {
      this.routes[route][event](arg);
    }
  }

  /**
   * Automatically load and fire Router events.
   *
   * Events are fired in the following order:
   * - common init
   * - page-specific init
   * - page specific finalize
   * - common finalize
   */
  loadEvents() {
    // Fire common `init`
    this.fire('common');

    // Fire page-specific JS
    const classes: string[] = document.body.className.split(/\s+/);

    classes.map(camelCase).forEach((className: string) => {
      this.fire(className);
      this.fire(className, 'finalize');
    })

    // Fire common `finalize`
    this.fire('common', 'finalize');
  }
}
