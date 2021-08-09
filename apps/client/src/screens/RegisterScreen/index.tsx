import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { useRegister } from './useRegister'
import { useStyles } from './styles'
import { Link } from 'react-router-dom'

export const RegisterScreen = () => {
  const classes = useStyles()
  const {
    nameTextFieldProps,
    emailTextFieldProps,
    passwordTextFieldProps,
    passwordConfirmationTextFieldProps,
    onSubmit,
  } = useRegister()

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={onSubmit}>
        <h2>サインアップ</h2>
        <TextField {...nameTextFieldProps} className={classes.textField} fullWidth />
        <TextField {...emailTextFieldProps} className={classes.textField} fullWidth />
        <TextField
          {...passwordTextFieldProps}
          className={classes.textField}
          fullWidth
          type={'password'}
        />
        <TextField
          {...passwordConfirmationTextFieldProps}
          className={classes.textField}
          fullWidth
          type={'password'}
        />
        <Button color="primary" variant="contained" type="submit">
          サインアップ
        </Button>
        <p>
          <Link to={'/login'}>ログインはこっちだよ！！</Link>
        </p>
      </form>
    </div>
  )
}
