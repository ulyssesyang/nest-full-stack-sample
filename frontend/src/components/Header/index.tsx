import React from 'react';
import { AppBar, Box, Toolbar } from '@mui/material';

import { Hamburger } from './Hamburger';
import { Search } from './Search';
import { AppTitle } from './AppTitle';
import { ThemeSwitcher } from './ThemeSwitcher';
interface HeaderProps {
  toggleNavigation: () => void;
}

export const Header = ({ toggleNavigation }: HeaderProps) => {
  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar disableGutters variant="dense">
          <Hamburger toggleNavigation={toggleNavigation} />
          <AppTitle />
          <Search />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}>
            <ThemeSwitcher />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};
