import { RouteProps } from '../components/Route'
import { DashboardScreen } from '../screens/DashboardScreen'
import { LoginScreen } from '../screens/LoginScreen'
import { RegisterScreen } from '../screens/RegisterScreen'
import { menuKey } from '../types/menuKey.type'

// Interfaces
export type GroupRouteProps = { [key in menuKey]?: RouteProps }
export type RouteMap = { [key in menuKey]?: RouteProps | GroupRouteProps }

// PublicRoutes
export const publicRoutes: RouteMap = {
  login: { path: '/login', exact: true, component: LoginScreen },
  register: { path: '/register', exact: true, component: RegisterScreen },
}

// PrivateRoutes
export const privateRoutes: RouteMap = {
  dashboard: { path: '/', exact: true, component: DashboardScreen },
}
