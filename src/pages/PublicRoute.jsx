// UI-only build: no authentication, so public routes simply render their children.
const PublicRoute = ({ children }) => children;

export default PublicRoute;
