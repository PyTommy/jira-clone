import { FormikUtils } from '@client/utils/formik.utils'
import { TextFieldProps } from '@material-ui/core'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { InferType } from 'yup'
import { login } from '../../store/actionCreators/index'

const validationSchema = yup.object({
  email: yup.string().email('Emailを入力してください').required('Emailは必須なんだよアホんだら'),
  password: yup
    .string()
    .min(8, 'パスワードは8桁以上は普通だからwwwww')
    .required('パスワードは必須だよ。。頭わるいの？'),
})

type LoginFormInputs = InferType<typeof validationSchema>

export const useLogin = (loginInputValue?: LoginFormInputs) => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: 'foobar@example.com',
      password: 'foobar',
    },
    validationSchema: validationSchema,
    onSubmit: ({ email, password }) => {
      dispatch(login({ email, password }))
    },
  })
  const emailTextFieldProps: TextFieldProps = FormikUtils.generateFormikTextFieldProps(formik, {
    id: 'email',
    label: 'email',
  })
  const passwordTextFieldProps: TextFieldProps = FormikUtils.generateFormikTextFieldProps(formik, {
    id: 'password',
    label: 'password',
  })

  return {
    emailTextFieldProps,
    passwordTextFieldProps,
    onsubmit: formik.handleSubmit,
  }
}
