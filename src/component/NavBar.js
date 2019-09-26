import React, {useState} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import { blue, red } from "@material-ui/core/colors";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import SvgIcon from "@material-ui/core/SvgIcon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import Signup from "./SignUp";
import Login from "./Login";
import Sell from './Sell';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },

  link: {
    color: "white",
    textDecoration: "none",
    marginRight: 25
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
}));

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export default function NavBar({ onClickSignup }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [userName,setUserName] = useState("");

  function handleLogin(email,password){
    console.log(email)
    let currentUser = {
      email: email,
      password: password
    }

    fetch('http://104.154.46.103:8000/login',{
      method: "POST",
      body: JSON.stringify(currentUser),
      headers:{ 'Content-Type':'application/json'}
    }).then(res=>res.json())
    .then(data=>{
      console.log(data);
      data.message==="User and password is correct"?
      setUserName(data.userName)
      :alert("invalid email or password")
    })
  }

  function hasSignup(username){
    setUserName(username)
  }

  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseLogin() {
    setAnchorEl(null);
  }
  function handleClose() {
    setOpen(false);
  }

  function handleLogout(){
    setOpen(false);
    setUserName(" ")
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <HomeIcon
              color="primary"
              fontSize="large"
              component={svgProps => {
                return (
                  <svg {...svgProps}>
                    <defs>
                      <linearGradient id="gradient1">
                        <stop offset="30%" stopColor={blue[400]} />
                        <stop offset="70%" stopColor={red[400]} />
                      </linearGradient>
                    </defs>
                    {React.cloneElement(svgProps.children[0], {
                      fill: "url(#gradient1)"
                    })}
                  </svg>
                );
              }}
            />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link className={classes.link} to="/">
              Home
            </Link>
            <Link className={classes.link} to="/paintings">
              Paintings
            </Link>
            <Sell userName={userName} />
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>

          {userName===""?
           <Login handleLogin={handleLogin}/>
        :<>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          variant="outlined"
          style={{ color: "white", marginTop: 5 }}
          onClick={handleClick}
        >
          {userName}
        </Button>

        {/*after login, user can check profile, account and log out*/}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleCloseLogin}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </>}
         


          {userName===""?
          <Signup ifSignup={hasSignup}/>
        : null }
          
        </Toolbar>
      </AppBar>
    </div>
  );
}
