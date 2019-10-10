import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Grid from '@material-ui/core/Grid';
import Image from "../images/gallery.jpeg";
import {local,gcp,gcpInsGroup} from "../config"

//JS CSS for this component
const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  grid: {
    textAlign: 'center',
    marginLeft: "15%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  },
  dense: {
    marginTop: 19
  },
  menu: {
    width: 200
  },
  image: {
    padding: theme.spacing(3, 2),
    margin: "3%",
    width: "100%"
  }
}));

//Detail parameters are changed and kept in this component
export default function SellDetail({ userName }) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    name: "",
    price: "",
    author: "",
    theme: "",
    description: ""
  });
  const [image,setImage] = React.useState({
  })

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const putImage = (event)=>{
      setImage(event.target.files[0])
     
  }
  

  const handleSell = async () => {
    // let newPainting = {
    //   name: values.name,
    //   price: values.price,
    //   author: values.author,
    //   theme: values.theme,
    //   description: values.description,
    //   seller: userName
    // }
    var formData = new FormData();
            formData.append("file",image);
            formData.append('name', values.name);
            formData.append('price', values.price);
            formData.append('author', values.author);
            formData.append('theme', values.theme);
            formData.append('description', values.description);
            formData.append('seller', userName);
            
    console.log(formData)
    // console.log(newPainting);
    const result = await fetch(`${gcpInsGroup}:8000/paintings/add`, {
      method: 'POST',
      // body: JSON.stringify(newPainting),
      body: formData,
      // headers: {
      //   'Content-Type': 'application/json',
      // }
    })

    const body = await result.json();

    console.log(body.message);
    setValues({
      name: "",
      price: "",
      author: "",
      theme: "",
      description: ""
    });
    alert("upload success!!")

  }



  return (
    <form className={classes.container} noValidate autoComplete="off">
      <Grid container spacing={3} className={classes.grid}>

        <Grid item xs={4}>
          <img src={`${Image}`} className={classes.image} alt="painting" />
          <div>
            <form encType="multipart/form-data" action="">
              <input id="upload" onChange={putImage} type="file" />
            </form>

          </div>
        </Grid>
        <Grid className={classes.grid} item xs={4}>
          <List>
            <ListItem>
              <TextField
                id="standard-name"
                label="Name"
                className={classes.textField}
                value={values.name}
                onChange={handleChange("name")}
                margin="normal"
              />
            </ListItem>


            <ListItem>
              <TextField
                id="standard-uncontrolled"
                label="Price"
                value={values.price}
                className={classes.textField}
                onChange={handleChange("price")}
                margin="normal"
              />
            </ListItem>

            <ListItem>
              <TextField
                required
                id="standard-required"
                label="Author"
                value={values.author}
                className={classes.textField}
                onChange={handleChange("author")}
                margin="normal"
              />
            </ListItem>
            <ListItem>
              <TextField
                required
                id="standard-required"
                label="Theme"
                value={values.theme}
                className={classes.textField}
                onChange={handleChange("theme")}
                margin="normal"
              />
            </ListItem>
            <ListItem>
              <TextField
                required
                id="standard-required"
                label="Description"
                multiline
                value={values.description}
                className={classes.textField}
                onChange={handleChange("description")}
                margin="normal"
              />
            </ListItem>
            <ListItem>
              <Button
                size="medium"
                variant="contained"
                color="primary"
                onClick={handleSell}

              >
                Save
      </Button>
            </ListItem>
          </List>
        </Grid>


      </Grid>

    </form>
  );
}
