import {
  AppBar,
  Divider,
  Drawer,
  Grid,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  withStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import React, { ReactNode } from 'react';
import PriceFeedUpdate from '../PriceFeedUpdate';

export interface LayoutProps {
  title: string;
  page: string;
  children: ReactNode;
  classes: any;
}

const menuItems = [
  { title: 'Network overview', link: '/' },
  { title: 'Melon Engine', link: 'engine' },
  { title: 'Melon Funds', link: 'funds' },
  { title: 'Managers', link: 'managers' },
  { title: 'Investors', link: 'investors' },
  { title: 'Asset Universe', link: 'assets' },
  { title: 'Exchanges', link: 'exchanges' },
  // { title: 'Contracts', link: 'contracts' },
  // { title: 'Addresses', link: 'addresses' },
  { title: 'Glossary', link: 'glossary' },
];

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  topDrawer: {
    ...theme.mixins.toolbar,
    background: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    textAlign: 'center',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    width: `calc(100% - ${drawerWidth}px)`,
    padding: theme.spacing(1),
    paddingTop: '0px',
  },
  aStyle: {
    textDecoration: 'none',
    color: 'white',
  },
});

class Layout extends React.Component<LayoutProps> {
  public state = {
    mobileOpen: false,
  };

  public handleDrawerToggle = () => {
    // @ts-ignore
    this.setState((state) => ({ mobileOpen: !state.mobileOpen }));
  };

  public render() {
    const { classes } = this.props;

    const drawer = (
      <>
        <div className={classes.toolbar}>
          <Link href="/">
            <a className={classes.aStyle}>
              <div className={classes.topDrawer}>
                <img src="/static/icon.png" alt="MLN logo" width="50" height="50" />{' '}
                <Typography variant="h6">&nbsp;Melon Network</Typography>
              </div>
            </a>
          </Link>
          <Divider />
          <List>
            {menuItems.map((item) => (
              <Link key={item.title} href={item.link}>
                <ListItem button={true} component="a" selected={this.props.page === item.link}>
                  <ListItemText primary={item.title} />
                </ListItem>
              </Link>
            ))}
            <ListItem>&nbsp;</ListItem>
            <ListItem>
              <PriceFeedUpdate />
            </ListItem>
          </List>
        </div>

        <div className={classes.paper}>
          <p>&nbsp;</p>
        </div>
      </>
    );

    return (
      <>
        <title>Melon Network - {this.props.title}</title>

        <div className={classes.root}>
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap={true}>
                {this.props.title}
              </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer}>
            <Hidden smUp={true} implementation="css">
              <Drawer
                variant="temporary"
                anchor={'left'}
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown={true} implementation="css">
              <Drawer
                classes={{
                  paper: classes.drawerPaper,
                }}
                variant="permanent"
                open={true}
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Grid container={true}>
              <Grid
                container={true}
                item={true}
                xs={12}
                spacing={2}
                style={{ paddingLeft: '16px', paddingTop: '16px' }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '60px',
                    textAlign: 'center',
                    background: '#6852ED',
                    color: 'white',
                    paddingTop: '20px',
                    paddingBottom: '20px',
                    paddingLeft: '10px',
                    paddingRight: '20px',
                    fontFamily: 'sans-serif',
                  }}
                >
                  You are browsing the Network Monitor for Melon v1 (deprecated). Enzyme v2 has launched to mainnet and
                  is available <a href="https://app.enzyme.finance">here</a>.
                </div>
                {this.props.children}
              </Grid>
            </Grid>
          </main>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(Layout);
