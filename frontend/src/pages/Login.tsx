import {useContext} from 'react';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import useForm from "../hooks/useForm";
import {IRequestInfo, fetchPromise, HTTP_Method} from "../hooks/useFetchCall";
import FormFields from "../components/FormFields";
import { APP_TITLE, PAGE_TITLE_LOGIN } from '../utils/constants';
import { AppContext } from '../contexts';

export const Login = () => {
  const { updateUser } = useContext(AppContext);

  const handleSubmit = () => {
    console.log(values);
    const requestInfo: IRequestInfo = {
      Method: HTTP_Method.POST,
      EndPoint: `${process.env.REACT_APP_API_BASE_PATH}/login`,
      RequestBody: values,
      Headers: { 'Content-Type': 'application/json' },
    };

    fetchPromise(requestInfo)
    .then((user: any) => {
      updateUser(user);
    },
    (error: Error) => {
      console.log({error});
      alert(error.message);
    });
  }

  const {
    onChange,
    onSubmit,
    values,
  } = useForm({initialValues: {}, callback: handleSubmit});

  const fields = [
    {
      gridSize: 12,
      width: 500,
      id: 'email',
      labelName: 'Email Address',
      onChange,
    },
    {
      gridSize: 12,
      width: 500,
      id: 'password',
      labelName: 'Password',
      onChange,
    }
  ]

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_LOGIN} | {APP_TITLE}
        </title>
      </Helmet>

      <form onSubmit={onSubmit}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', margin: '2rem' }}>Login Page</Typography>
          <FormFields fields={fields} />
          <Grid item xs sx={{ textAlign: 'center' }}>
            <Button type="submit"> Login</Button>
          </Grid>
        </Box>
      </form>

      <Box sx={{ textAlign: 'center' }}>
        <Link to="/register">Need Register?</Link>
      </Box>
    </>
  );
};
