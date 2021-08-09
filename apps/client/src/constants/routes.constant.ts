import { RouteProps } from '@client/components/Route'
import { DashboardScreen } from '@client/screens/DashboardScreen'
import { RegisterScreen } from '@client/screens/RegisterScreen'
import { menuKey } from '@client/types/menuKey.type'
import LoginScreen from '../screens/LoginScreen'

// Interfaces
export type GroupRouteProps = { [key in menuKey]?: RouteProps }
export type RouteMap = { [key in menuKey]?: RouteProps | GroupRouteProps }

// PublicRoutes
export const publicRoutes: RouteMap = {
  login: { path: '/login', exact: true, component: LoginScreen },
  register: { path: '/register', exact: true, component: RegisterScreen },
} as const

// PrivateRoutes
export const privateRoutes: RouteMap = {
  dashboard: { path: '/', exact: true, component: DashboardScreen },
} as const
