import React, {useState,useEffect}from "react";
import NavBar from "../component/NavBar";
import { Grid, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Image from "../images/gallery.jpeg";
import { List, ListItem, ListItemText } from "@material-ui/core/";
import Button from "@material-ui/core/Button";

const styles = {
  image: {
    // padding: theme.spacing(3, 2),
    margin: "3%",
    width: "100%"
  },
  price: {
    margin: "8% 8%"
  }
};

export default class Detail extends React.Component {
 state = {
        name: this.props.match.params.name,
        price:"",
        author:"",
        theme:"",
        description:""

    }


  componentDidMount(){
    const name=this.state.name;
    console.log(this.props.match.params);
    fetch(`http://104.154.46.103:8000/paintings/detail/${name}`)
        .then(res => res.json())
        .then(data => {
         this.setState({price:data[0].price,
        author:data[0].author,
        theme:data[0].theme,
      description: data[0].description})
         console.log(this.state.price)
        
        });
  }

  render(){
  const {name,price,author,description} = this.state;

  //  const [info, setInfo]=useState({});

  // useEffect(() => {
  //   // fetch(`http://localhost:8000/paintings/${id}`)
  //   fetch(`http://localhost:8000/paintings/${name}`)
  //     .then(res => res.json())
  //     .then(data => {
  //      setInfo(data)
  //      console.log(data)
  //     });
  // },{});

  return (
    
    <>
      <NavBar />
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <img src={`${Image}`} 
          // className={classes.image}
          style={styles.image}
           alt="painting" />
        </Grid>

        <Grid item xs={5}>
          <List component="nav" 
          // className={classes.price}
          style={styles.price}
          >
            <ListItem>
              <Typography variant="h3" >
                Name: {name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="h3">
                Author: {author}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="h3" >
                Price: {price}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="h3" wrap>
                Description:
                <Typography variant="h5" wrap>
                  {description}
                </Typography>
              </Typography>
            </ListItem>
            <ListItem>
              <Button
                variant="contained"
                color="primary"
                // className={classes.button}
                style={styles.button}
              >
                BUY NOW
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ marginLeft: "5%" }}
              >
                ADD To CART
              </Button>
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  );
}
}

