import Box, { BoxProps } from '@material-ui/core/Box';
import { styled } from '@material-ui/core/styles';

const Dimmable = styled(Box, { shouldForwardProp: (prop) => prop !== 'dim' })<BoxProps & { dim?: boolean }>(
  ({ dim }) => ({
    transition: 'opacity 0.5s ease',
    opacity: dim ? 0.2 : 1,
    pointerEvents: dim ? 'none' : 'auto',
  }),
);

export default Dimmable;
