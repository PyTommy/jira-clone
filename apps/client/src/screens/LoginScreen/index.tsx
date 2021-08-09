import { TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { useFormik } from 'formik'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { useStyles } from './styles'

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Emailは必須なんだよアホんだら'),
  password: yup
    .string()
    .min(8, 'パスワードは8桁以上は普通だからwwwww')
    .required('パスワードは必須だよ。。頭わるいの？'),
})

export const LoginScreen = () => {
  const classes = useStyles()
  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return (
    <div className={classes.root}>
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <h2>ログイン</h2>
        <TextField
          id="email"
          name="email"
          label="Email"
          className={classes.textField}
          fullWidth
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          id="password"
          name="password"
          label="Password"
          className={classes.textField}
          fullWidth
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" type="submit">
          ログイン
        </Button>
        <p>
          <Link to={'/register'}>サインアップはこちら！</Link>
        </p>
      </form>
    </div>
  )
}
