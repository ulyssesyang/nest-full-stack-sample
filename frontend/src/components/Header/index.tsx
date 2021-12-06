import React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';

import { Hamburger } from './Hamburger';
import { Search } from './Search';
import { AppTitle } from './AppTitle';
import { ThemeSwitcher } from './ThemeSwitcher';
interface HeaderProps {
  toggleNavigation: () => void,
  handleSearch: React.ChangeEventHandler<HTMLInputElement>
}

export const Header = ({ toggleNavigation, handleSearch }: HeaderProps) => {
  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar disableGutters variant="dense">
          <Hamburger toggleNavigation={toggleNavigation} />
          <AppTitle />
          <Search onChange={handleSearch} />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
            <ThemeSwitcher />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
