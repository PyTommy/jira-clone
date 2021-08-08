import { Color } from '@client/constants/styles.constants'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: { width: 500, padding: 50, border: `solid 1px ${Color.gray}`, borderRadius: 10 },
  textField: {
    marginBottom: 15,
  },
}))
