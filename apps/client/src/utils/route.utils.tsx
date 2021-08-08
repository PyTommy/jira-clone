import { RouteProps, Route } from '@client/components/Route'
import { GroupRouteProps, RouteMap } from '@client/constants/routes.constant'
import { ReactElement } from 'react'

class RouteUtilsImpl {
  /**
   * RoutePropsインターフェースかの型チェック。
   * @param props
   */
  isRouteProps = (props: RouteProps | GroupRouteProps): props is RouteProps => {
    return typeof props === 'object' && typeof (props as any).path === 'string'
  }

  /**
   * Routeのリストを返す。
   * @param routeMap
   */
  renderRoutes = (routeMap: RouteMap): ReactElement<any, any>[] => {
    const routes: ReactElement<any, any>[] = []
    for (const [key, props] of Object.entries(routeMap)) {
      if (this.isRouteProps(props)) {
        routes.push(<Route {...props} key={`${key}_${props.path}`} />)
      } else {
        routes.push(...this.renderRoutes(props))
      }
    }
    return routes
  }
}
export const RouteUtils = new RouteUtilsImpl()
