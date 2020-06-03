import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { Breadcrumbs, List, ListItem, ListItemText } from '@material-ui/core';
import YAML from 'yamljs'
import { EnvoyDataSchema, EnvoyDataFactory } from './data/envoy';
import { AdminDataSchema } from './data/admin';
import AdminDataForm from './AdminDataForm';
import { EnvoyBreadcrumbs, EnvoyBreadcrumb } from './EnvoyBreadcrumbs';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="mailto:harimoto@jp.ibm.com">
        Hirofumi Arimoto
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

type EditorProps = {
  data: EnvoyDataSchema
  onUpdate: (data: EnvoyDataSchema) => void
  generate: () => void
}

const Editor = (props: EditorProps) => {
  const {data, onUpdate, generate} = props
  const [selectedForm, setSelectedForm] =
    useState("list")
  const classes = useStyles();

  const envoyBreadcrumb: EnvoyBreadcrumb = {
    title: 'Envoy',
    onClick: () => setSelectedForm('list')
  }
  const adminBreadcrumb: EnvoyBreadcrumb = {
    title: 'Admin',
    onClick: () => setSelectedForm('admin')
  }

  const selectedForms: {[key: string]: () => JSX.Element} = {
    list: () =>
      <>
        <List component="nav" aria-label="secondary mailbox folders">
          <ListItem button>
            <ListItemText
              primary="Admin"
              onClick={() => setSelectedForm('admin')}/>
          </ListItem>
          <ListItem button>
            <ListItemText primary="Static Resources" />
          </ListItem>
        </List>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            onClick={generate}
            className={classes.button}
          >
            Generate
          </Button>
        </div>
      </>,
    admin: () =>
      <>
        <EnvoyBreadcrumbs
          breadcrumbs={[envoyBreadcrumb, adminBreadcrumb]}/>
        <AdminDataForm
          data={props.data.admin}
          onUpdate={handleAdminDataUpdate} />
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setSelectedForm('list')}
            className={classes.button}
          >
            Back
          </Button>
        </div>
      </>
  }

  const handleX = () => {
  };

  const handleAdminDataUpdate = (adminData?: AdminDataSchema) => {
    onUpdate({...data, admin: adminData})
  }

  return (<Paper className={classes.paper}>
    <Typography component="h1" variant="h4" align="center">
      Envoy
    </Typography>
    <React.Fragment>
      {selectedForms[selectedForm]()}
    </React.Fragment>
  </Paper>)
}

type GeneratorProps = {
  data: EnvoyDataSchema
  onClose: () => void
}

const Generator = (props: GeneratorProps) => {
  const {data, onClose} = props
  const classes = useStyles();
  console.log(data.json())
  const yaml = YAML.stringify(data.json(), 2, 2)
  return (<Paper className={classes.paper}>
    <>
    <Typography component="h1" variant="h4" align="center">
      Generated
    </Typography>
    <pre><code>{yaml}</code></pre>
      {/* {yaml.split('\n').map(line => <code>{line}</code>)} */}
    <Button
      variant="contained"
      color="primary"
      onClick={onClose}
      className={classes.button}
    >
      Close
    </Button>
    </>
  </Paper>)
}

export default function App() {
  const classes = useStyles();
  const [data, setData] = useState(EnvoyDataFactory.create())
  const [generatorShown, setGeneratorShown] = useState(false)

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Envoy Yaml Generator
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        {generatorShown?
          <Generator data={data} onClose={() => setGeneratorShown(false)}/> :
          <Editor data={data}
            onUpdate={(data) => {console.log(data); setData(data)}}
            generate={() => setGeneratorShown(true)}/>
        }
        <Copyright />
      </main>
    </React.Fragment>
  );
}