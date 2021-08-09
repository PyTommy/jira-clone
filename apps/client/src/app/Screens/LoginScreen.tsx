import { makeStyles, TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import React from 'react'
import { useLogin } from '../../screens/LoginScreen/useLogin'
const LoginScreen = () => {
  const classes = useStyles()
  const { emailTextFieldProps, passwordTextFieldProps, onsubmit } = useLogin()
  return (
    <div>
      <form onSubmit={onsubmit}>
        <TextField fullWidth {...emailTextFieldProps} />
        <TextField fullWidth {...passwordTextFieldProps} />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default LoginScreen

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'red',
    width: '560px',
    height: '800px',
  },
}))
