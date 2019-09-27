import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function SignUp({ifSignup}) {
  const [open, setOpen] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [userPassword, setUserPassword] = React.useState("");

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleSignup= async ()=>{
    setOpen(false);
    let newUser={
      email: userEmail,
      username: userName,
      password: userPassword
    }
    console.log(newUser);
    const result = await fetch('http://localhost:8000/signup ',{
      method:'POST',
      body:JSON.stringify(newUser),
      headers:{
        'Content-Type':'application/json',
      }
    })
    
    const body= await result.json();
    console.log(body)
    ifSignup(body.userName)
  }

  return (
    <div>
      <Button color="inherit" onClick={handleClickOpen}>
        Signup
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Signup</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            value={userEmail}
            onChange={({ target }) => setUserEmail(target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="User Name"
            type="text"
            fullWidth
            value={userName}
            onChange={({ target }) => setUserName(target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="text"
            fullWidth
            value={userPassword}
            onChange={({ target }) => setUserPassword(target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSignup} color="primary">
            Signup
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
