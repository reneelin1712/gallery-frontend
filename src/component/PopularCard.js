import React, { useState, useContext } from "react";
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
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { UserContext } from '../Context';
import Rater from 'react-rater'
import 'react-rater/lib/react-rater.css'


const useStyles = makeStyles({
  card: {
    width: 345
  },
  media: {
    height: 180
  },
  link: {
    textDecoration: "none",
    marginRight: 10
  }
});

export default function PaintingCard({ name, description, id, imgUrl,pID }) {
  const classes = useStyles();
  const [likeColor, setLikeColor] = useState("");
  const [userInfo, setUserInfo] = useContext(UserContext);
      
return (
  <Card className={classes.card}>
    <Link to={`/paintings/detail/${name}`} className={classes.link} >
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={imgUrl}
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

  </Card>
);
}
