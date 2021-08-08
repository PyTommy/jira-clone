import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import LoginScreen from './app/Screens/LoginScreen'

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Route path="/" exact component={LoginScreen}></Route>
    </BrowserRouter>
  </StrictMode>,
  document.getElementById('root'),
)
