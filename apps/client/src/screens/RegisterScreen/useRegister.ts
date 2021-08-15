import { TextFieldProps } from '@material-ui/core'
import { useFormik } from 'formik'
import React from 'react'
import { useDispatch } from 'react-redux'
import * as yup from 'yup'
import { InferType } from 'yup'
import { register } from '../../store/actionCreators'
import { FormikUtils } from '../../utils/formik.utils'

const validationSchema = yup.object({
  name: yup
    .string()
    .required('名前入力せいや！！ドアホ！！')
    .max(30, '名前長すぎだろ笑！改名してこい！！'),
  email: yup.string().email('Enter a valid email').required('Emailは必須なんだよアホんだら'),
  password: yup
    .string()
    .min(8, 'パスワードは8桁以上は普通だからwwwww')
    .required('パスワードは必須だよ。。頭わるいの？'),
  password_confirmation: yup.string().oneOf([yup.ref('password'), null], '上と一緒にしろよ！！'),
})

type RegisterFormInputs = InferType<typeof validationSchema>
interface ReturnValue {
  nameTextFieldProps: TextFieldProps
  emailTextFieldProps: TextFieldProps
  passwordTextFieldProps: TextFieldProps
  passwordConfirmationTextFieldProps: TextFieldProps
  onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
}

export const useRegister = (initialValues?: RegisterFormInputs): ReturnValue => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      name: 'tommy',
      email: 'demodemo@example.com',
      password: 'demodemo',
      password_confirmation: 'demodemo',
      ...initialValues,
    },
    validationSchema: validationSchema,
    onSubmit: ({ name, email, password }) => {
      dispatch(register({ name, email, password }))
    },
  })

  const nameTextFieldProps: TextFieldProps = FormikUtils.generateFormikTextFieldProps(formik, {
    id: 'name',
    label: '名前',
  })
  const emailTextFieldProps: TextFieldProps = FormikUtils.generateFormikTextFieldProps(formik, {
    id: 'email',
    label: 'メールアドレス',
  })
  const passwordTextFieldProps: TextFieldProps = FormikUtils.generateFormikTextFieldProps(formik, {
    id: 'password',
    label: 'パスワード',
  })
  const passwordConfirmationTextFieldProps: TextFieldProps =
    FormikUtils.generateFormikTextFieldProps(formik, {
      id: 'password_confirmation',
      label: 'パスワード再入力',
    })

  return {
    nameTextFieldProps,
    emailTextFieldProps,
    passwordTextFieldProps,
    passwordConfirmationTextFieldProps,
    onSubmit: formik.handleSubmit,
  }
}
