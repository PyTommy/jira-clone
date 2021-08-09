import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Switch } from 'react-router-dom'
import { RedirectRoute } from './components/Route'
import { privateRoutes, publicRoutes } from './constants/routes.constant'
import { selectAuth } from './store/selectors'
import { RouteUtils } from './utils/route.utils'

export const App = () => {
  const [isInializing, setIsInitializing] = useState(false) // 自動ログインとかする。
  const { isAuthenticated } = useSelector(selectAuth)

  if (isInializing) {
    return <div>This is Loading Spinner!!</div>
  } else if (isAuthenticated) {
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
