import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch } from 'react-router-dom'
import { RedirectRoute } from './components/Route'
import { privateRoutes, publicRoutes } from './constants/routes.constant'
import { Layout } from './containers/Layout'
import { cookieLogin } from './store/actionCreators'
import { selectAuth } from './store/selectors'
import { RouteUtils } from './utils/route.utils'

export const App = () => {
  const dispatch = useDispatch()
  const [isInializing, setIsInitializing] = useState(true) // 自動ログインとかする。
  const { isAuthenticated } = useSelector(selectAuth)

  const initApp = useCallback(async () => {
    await dispatch(cookieLogin())
    setIsInitializing(() => false)
  }, [setIsInitializing, dispatch])

  useEffect(() => {
    initApp()
  }, [initApp])

  if (isInializing) {
    return <div>This is Loading Spinner!!</div>
  } else if (isAuthenticated) {
    return (
      <Layout>
        {RouteUtils.renderRoutes(privateRoutes)}
        <RedirectRoute path={'*'} to={'/'} />
      </Layout>
    )
  } else {
    return (
      <Layout>
        <Switch>
          {RouteUtils.renderRoutes(publicRoutes)}
          <RedirectRoute path={'*'} to={'/login'} />
        </Switch>
      </Layout>
    )
  }
}

export default App
