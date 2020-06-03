import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { AdminDataFactory, AdminDataSchema } from './data/admin';
import { FormControlLabel, Checkbox, Switch } from '@material-ui/core';

type Props = {
  data?: AdminDataSchema
  onUpdate: (data?: AdminDataSchema) => void
}

export default function AdminDataForm(props: Props) {
  const {data, onUpdate} = props
  const handleSwitch = (value: boolean) => {
    onUpdate(value? AdminDataFactory.create() : undefined)
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Admin
      </Typography>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Switch
              checked={typeof data !== 'undefined'}
              onChange={(e) => {handleSwitch(e.target.checked)}} />
          }
          label="Use an admin server"
        />
      </Grid>
      {typeof data === 'undefined' ? 
        <> </> :
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              name="Socket Address"
              label="Socket Address"
              fullWidth
              autoComplete="socket-address"
              value={data.socket_address}
              onChange={(e) => {
                onUpdate({
                  ...(data || {}),
                  ...{socket_address: e.target.value}
                } as AdminDataSchema)
              }}
            />
            <TextField
              required
              name="Socket Port"
              label="Socket Port"
              fullWidth
              autoComplete="socket-port"
              value={data.socket_port}
              onChange={(e) => {
                onUpdate({
                  ...(data || {}),
                  ...{socket_port: parseInt(e.target.value)}
                } as AdminDataSchema)
              }}
            />
            <TextField
              required
              name="Access Log Path"
              label="Access Log Path"
              fullWidth
              autoComplete="access-log-path"
              value={data.access_log_path}
              onChange={(e) => {
                onUpdate({
                  ...(data || {}),
                  ...{access_log_path: e.target.value}
                } as AdminDataSchema)
              }}
            />
          </Grid>
        </Grid>
      }
    </React.Fragment>
  );
}