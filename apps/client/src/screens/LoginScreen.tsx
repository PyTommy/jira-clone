import { Link } from '@client/components/Link'
import { makeStyles, TextField } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { useFormik } from 'formik'
import React from 'react'
import * as yup from 'yup'

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Emailは必須なんだよアホんだら'),
  password: yup
    .string()
    .min(8, 'パスワードは8桁以上は普通だからwwwww')
    .required('パスワードは必須だよ。。頭わるいの？'),
})

const LoginScreen = () => {
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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Submit
        </Button>
        <p>
          <Link to={'/register'}>サインアップはこちら！</Link>
        </p>
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
