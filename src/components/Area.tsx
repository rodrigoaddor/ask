import React, { ReactNode } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Card, { CardProps } from '@material-ui/core/Card';
import CardActions, { CardActionsProps } from '@material-ui/core/CardActions';
import CardContent, { CardContentProps } from '@material-ui/core/CardContent';
import CardHeader, { CardHeaderProps } from '@material-ui/core/CardHeader';
import Divider from '@material-ui/core/Divider';
import { styled, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Loading from './Loading';
import Stack from './Stack';

const AreaContainer = styled(Card)<CardProps>(() => ({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '50vh',
  minWidth: '30rem',
}));

const AreaActions = styled(CardActions)<CardActionsProps>(({ theme }) => ({
  flexDirection: 'column',
  '& > *': {
    marginBottom: `${theme.spacing(1)} !important`,
  },
  '& > :not(:first-of-type)': {
    marginLeft: 'initial',
  },
}));

const AreaContent = styled(CardContent, { shouldForwardProp: (prop) => prop !== 'dim' })<
  CardContentProps & { dim?: boolean }
>(({ dim }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flex: '1 1 0',
  transition: 'opacity 0.5s ease',
  opacity: dim ? 0.2 : 1,
  pointerEvents: dim ? 'none' : 'auto',
}));

const AreaHeader = styled(CardHeader)<CardHeaderProps>(({ theme }) => ({
  textAlign: 'center',
  background: theme.palette.background.default,
  border: '2px solid rgba(255, 255, 255, 0.05)',
  borderBottomStyle: 'none',
  borderRadius: '4px 4px 0 0',
}));

interface AreaProps {
  title: string;
  content: ReactNode;
  actions?: ReactNode;
  loading?: boolean;
}

const Area = ({ title, content, actions, loading }: AreaProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return isMobile ? (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' align='center' sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      {content}
      <Divider sx={{ width: `calc(100% - ${theme.spacing(5)})` }} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          my: theme.spacing(2),
          '& > *': { my: theme.spacing(1) },
        }}
      >
        {actions}
      </Box>
    </Box>
  ) : (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <AreaContainer>
        <AreaHeader title={title} />
        <Stack>
          <AreaContent dim={loading}>{content}</AreaContent>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            sx={{
              transition: 'opacity 0.5s ease 0.2s',
              opacity: loading ? 1 : 0,
              pointerEvents: 'none',
            }}
          >
            <Loading />
          </Box>
        </Stack>
        {actions && <AreaActions>{actions}</AreaActions>}
      </AreaContainer>
    </Box>
  );
};

export default Area;
export { AreaContainer, AreaActions, AreaContent, AreaHeader };
