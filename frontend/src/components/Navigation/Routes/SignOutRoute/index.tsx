import { ListItemButton, ListItemIcon, ListItemText, IconButton, styled } from '@mui/material';
import ExitToApp from '@mui/icons-material/ExitToApp';
import { useContext } from 'react';
import { AppContext } from '../../../../contexts';

export const SignOutRoute = () => {
  const context = useContext(AppContext);

  const handleSignOutClick = () => {
    context.updateUser({});
    window.localStorage.removeItem('user');
    console.log('sign out...');
    window.location.assign('/login');
  };

  return (
    <StyledListItemButton onClick={handleSignOutClick}>
      <ListItemIcon>
        <IconButton size="small">
          <ExitToApp />
        </IconButton>
      </ListItemIcon>
      <ListItemText primary="Sign Out" />
    </StyledListItemButton>
  );
};

const StyledListItemButton = styled(ListItemButton)`
  position: absolute;
  bottom: 0;
  width: 100%;
`;
