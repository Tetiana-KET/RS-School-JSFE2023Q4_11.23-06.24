export class Router {
  routes: Record<string, () => void>;

  constructor() {
    this.routes = {};
    // Add a default route for the root path ("/")
    this.addRoute('/', () => {
      // Handle the root path navigation, for example, navigate to the login page
      this.navigateTo('#/login');
    });

    // Listen for hashchange events to handle hash-based routing
    window.addEventListener('hashchange', () => {
      const route = window.location.hash.slice(1); // Remove the leading '#' symbol
      this.navigateTo(route);
    });
  }

  addRoute(path: string, callback: () => void): void {
    this.routes[path] = callback;
  }

  navigateTo(path: string): void {
    if (this.routes[path]) {
      this.routes[path]();
    } else {
      console.error(`Route not found: ${path}`);
    }
  }
}
