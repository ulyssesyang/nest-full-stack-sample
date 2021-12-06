import { Typography, Divider } from '@mui/material';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';

import { AppContext } from '../contexts';
import { APP_TITLE, PAGE_TITLE_FAVORITE } from '../utils/constants';
import useFetchCall, { IRequestInfo, HTTP_Method } from "../hooks/useFetchCall";

export const Favorites = () => {
  const appContext = useContext(AppContext);
  const requestInfo: IRequestInfo = {
    Method: HTTP_Method.GET,
    EndPoint: `${process.env.REACT_APP_API_BASE_PATH}/weather/${appContext.user._id}`,
    Headers: {
      Authorization: `Bearer ${appContext.user.token}`,
    },
  };

  const [responseInfo] = useFetchCall(requestInfo);

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_FAVORITE} | {APP_TITLE}
        </title>
      </Helmet>
      <Typography variant="h4">{`${appContext.user.name} Favorites`}</Typography>
      <br/>
      {
        responseInfo?.Data?.length ?
        responseInfo.Data.map(favorite => {
          return (
            <Grid container spacing={2} key={favorite._id}>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <ListItem>Location: {favorite.name}</ListItem>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <ListItem>Weather: {favorite.weather}</ListItem>
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <ListItem>Temperature: {favorite.temp} F</ListItem>
              </Grid>
              <Divider light />
            </Grid>
          );
        }) : <div>You have no favorites</div>
      }
    </>
  );
};
