import { Typography } from '@mui/material';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="left">Location</TableCell>
              <TableCell align="left">Weather</TableCell>
              <TableCell align="left">Temperature</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              responseInfo?.Data?.length ?
              responseInfo.Data.map((favorite, index) => (
                <TableRow
                  key={favorite._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell align="left">{favorite.name}</TableCell>
                  <TableCell align="left">{favorite.weather}</TableCell>
                  <TableCell align="left">{favorite.temp} F</TableCell>
                </TableRow>
              ))
              : <div>You have no favorites</div>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
