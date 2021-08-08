import React, { Component, ReactElement, useState } from 'react'
import LoginScreen from './screens/LoginScreen'
import { Switch } from 'react-router-dom'
import { RouteUtils } from './utils/route.utils'
import { privateRoutes, publicRoutes } from './constants/routes.constant'
import { RedirectRoute } from './components/Route'

export const App = () => {
  const [isInializing, setIsInitializing] = useState(false) // 自動ログインとかする。
  const isAuthorized = false

  if (isInializing) {
    return <div>This is Loading Spinner!!</div>
  } else if (isAuthorized) {
    return (
      <main>
        {RouteUtils.renderRoutes(privateRoutes)}
        <RedirectRoute path={'*'} to={'/'} />
      </main>
    )
  } else {
    return (
      <main>
        <Switch>
          {RouteUtils.renderRoutes(publicRoutes)}
          <RedirectRoute path={'*'} to={'/login'} />
        </Switch>
      </main>
    )
  }
}

export default App
