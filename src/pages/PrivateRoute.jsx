// UI-only build: no authentication, so protected routes simply render their children.
const PrivateRoute = ({ children }) => children;

export default PrivateRoute;
