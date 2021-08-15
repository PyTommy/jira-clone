import { makeStyles } from '@material-ui/core'
import { Color } from '../../constants/styles.constants'

export const useStyles = makeStyles((_theme) => {
  return {
    root: {
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    form: {
      width: 500,
      padding: 50,
      border: `solid 1px ${Color.gray}`,
      borderRadius: 30,
    },
    textField: {
      marginBottom: 15,
    },
    button: {
      backgroundColor: Color.skyBlue,
      borderRadius: 10,
    },
    backgroundImage: {
      wdith: 540,
      height: 540,
    },
  }
})
