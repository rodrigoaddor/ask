import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',

    '& > *': {
      justifyContent: 'center',
      flex: '1 1 0',
      '&:not(:first-child):not(:last-child)': {
        flex: 'initial',
        margin: theme.spacing(4),
      },
      '&:first-child': { justifyContent: 'flex-end' },
      '&:last-child': { justifyContent: 'flex-start' },
    },
  },
}));