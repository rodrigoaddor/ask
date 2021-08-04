import Box, { BoxProps } from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';

const Stack = styled(Box)<BoxProps>(() => ({
  display: 'grid',
  gridTemplate: '100% / 100%',
  placeItems: 'stretch',
  flex: 1,
  '& > *': {
    gridColumn: '1 / 1',
    gridRow: '1 / 1',
  },
}));

export default Stack;
