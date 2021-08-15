import { Button, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useStyles } from './styles'
import { useLogin } from './useLogin'

export const LoginScreen = () => {
  const classes = useStyles()
  const { emailTextFieldProps, passwordTextFieldProps, onsubmit } = useLogin()

  return (
    <div className={classes.root}>
      <form onSubmit={onsubmit} className={classes.form}>
        <h2>Login</h2>
        <TextField className={classes.textField} fullWidth {...emailTextFieldProps} />
        <TextField className={classes.textField} fullWidth {...passwordTextFieldProps} />
        <Button variant="contained" type="submit" color="primary">
          login
        </Button>
        <p>
          <Link to={'/register'}>サインアップはこちら！</Link>
        </p>
      </form>
      <img
        className={classes.backgroundImage}
        alt="Grapefruit slice atop a pile of other slices"
        src="../../assets/loginScreen/loginScreenIllust.jpg"
      />
    </div>
  )
}
