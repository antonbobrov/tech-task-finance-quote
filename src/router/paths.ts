import RouteQuotes from './routes/Quotes';
import RouteHome from './routes/Home';
import RouteLogin from './routes/Login';
import RouteNotFound from './routes/NotFound';
import RouteConverter from './routes/Converter';
import RouteHistory from './routes/History';

const routePaths = {
  HOME: '/',
  LOGIN: '/login',
  QUOTES: '/quotes',
  CONVERTER: '/converter',
  HISTORY: '/history',
  NOT_FOUND: '*',
};
export default routePaths;

interface Path {
  name: string;
  path: string;
  component: React.ComponentType;
}

export const publicPaths: Path[] = [
  { name: 'Home', path: routePaths.HOME, component: RouteHome },
  { name: 'Log in', path: routePaths.LOGIN, component: RouteLogin },
];

export const privatePaths: Path[] = [
  { name: 'List Quotes', path: routePaths.QUOTES, component: RouteQuotes },
  { name: 'Converter', path: routePaths.CONVERTER, component: RouteConverter },
  { name: 'History', path: routePaths.HISTORY, component: RouteHistory },
];

export const generalPaths: Path[] = [
  { name: 'Not Found', path: routePaths.NOT_FOUND, component: RouteNotFound },
];
