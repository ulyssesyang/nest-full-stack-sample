import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import useForm from "../hooks/useForm";
import FormFields from "../components/FormFields";
import { APP_TITLE, PAGE_TITLE_REGISTER } from '../utils/constants';

export const Register = () => {
  const handleSubmit = () => {
    console.log(values)
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
      id: 'name',
      labelName: 'User Name',
      onChange,
    },
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
    },
  ]

  return (
    <>
      <Helmet>
        <title>
          {PAGE_TITLE_REGISTER} | {APP_TITLE}
        </title>
      </Helmet>

      <form onSubmit={onSubmit}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h4" sx={{ textAlign: 'center', margin: '2rem' }}>Register Page</Typography>
          <FormFields fields={fields} />
          <Grid item xs sx={{ textAlign: 'center' }}>
            <Button type="submit">Register</Button>
          </Grid>
        </Box>
      </form>

      <Box sx={{ textAlign: 'center' }}>
        <Link to="/login">Need Login?</Link>
      </Box>
    </>
  );
};
