import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Image from "../images/gallery.jpeg";
import { Link } from "react-router-dom";


const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  link: {
    textDecoration: "none",
    marginRight: 10
  }
});

export default function PaintingCard({name,description}) {
  const classes = useStyles();
  

  return (
    <Card className={classes.card}>
      <Link to={`/paintings/detail/${name}`} className={classes.link} >
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`${Image}`}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {console.log(name)}
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Button variant="contained" color="primary" className={classes.button}>
          BUY NOW
        </Button>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
