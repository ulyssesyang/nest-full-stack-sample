import React from 'react';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';

interface IFormFieldsProps {
  fields: IFormField[]
}

interface IFormField {
  gridSize: number,
  width: number,
  id: string,
  type?: string,
  labelName: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
}

export default function FormFields(props: IFormFieldsProps) {
  return (
    <Grid container spacing={2}>
      {
        props.fields.map((field) => {
          return (
            <Grid item xs={field.gridSize} sx={{ textAlign: 'center' }} key={`form-field-${field.id}`}>
              <FormControl sx={{ width: field.width }}>
                <InputLabel htmlFor={field.id}>{field.labelName}</InputLabel>
                <Input required id={field.id} type={field.type || field.id} onChange={field.onChange} />
              </FormControl>
            </Grid>
          );
        })
      }
    </Grid>
  );
}
