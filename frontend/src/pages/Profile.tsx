import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';

import { AppContext, WeatherContext } from '../contexts';
import { APP_TITLE, PAGE_TITLE_HOME } from '../utils/constants';
import {IRequestInfo, fetchPromise, HTTP_Method} from "../hooks/useFetchCall";

export const Home = () => {
  const appContext = useContext(AppContext);
  const weatherContext = useContext(WeatherContext);

  const submitFavorite = () => {
    const weather = weatherContext.weather;
    const user = appContext.user;
    console.log('weather :>> ', weather);

    if (!weather.name) {
      return;
    }

    const requestInfo: IRequestInfo = {
      Method: HTTP_Method.POST,
      EndPoint: `${process.env.REACT_APP_API_BASE_PATH}/weather`,
      Headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      },
      RequestBody: {
        ...weather,
        userId: user._id,
      }
    };

    fetchPromise(requestInfo)
    .then((favorite: any) => {
      console.log({favorite});
    },
    (error: Error) => {
      console.log({error});
      alert(error.message);
    });
  }

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_HOME} | {APP_TITLE}
        </title>
      </Helmet>
      <Typography variant="h4">{`Search Favorite Location Weather, ${appContext.user.name} 🎃`}</Typography>
      <br/>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <ListItem>Location: {weatherContext.weather?.name}</ListItem>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <ListItem>Weather: {weatherContext.weather?.weather}</ListItem>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <ListItem>Temperature{weatherContext.weather?.temp} F</ListItem>
        </Grid>
      </Grid>
      <Grid item xs sx={{ textAlign: 'center' }}>
          <Button type="submit" onClick={submitFavorite}> Save As Favorite</Button>
      </Grid>
    </>
  );
};
