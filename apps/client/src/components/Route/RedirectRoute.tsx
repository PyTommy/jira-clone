import { Redirect, RedirectProps } from '../Redirect/Redirect'
import { Route, RouteProps } from './Route'

export const RedirectRoute = (props: RouteProps & Omit<RedirectProps, 'from'>) => {
  return (
    <Route
      {...props}
      render={(routeProps) => (
        <Redirect
          {...props}
          from={`${routeProps.location.pathname}${routeProps.location.search || ''}`}
        />
      )}
    />
  )
}
