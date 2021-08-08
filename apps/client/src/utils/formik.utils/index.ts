import { FormikValues } from 'formik'
import { GenerateFormikTextFieldProps } from './generateFormikTextField.type'

interface IFormikUtils {
  generateFormikTextFieldProps: GenerateFormikTextFieldProps
}

class FormikUtilsImpl implements IFormikUtils {
  generateFormikTextFieldProps: GenerateFormikTextFieldProps = (
    formik,
    { id, label, ...otherTextFieldProps },
  ) => {
    const key = String(id)

    return {
      id: key,
      name: key,
      label: label,
      value: formik.values[key],
      onChange: formik.handleChange,
      error: formik.touched[key] && Boolean(formik.errors[key]),
      helperText: formik.touched[key] && formik.errors[key],
    }
  }
}

export const FormikUtils = new FormikUtilsImpl()
