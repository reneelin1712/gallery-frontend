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
import 'react-rater/lib/react-rater.css';
import {local,gcp} from "../config"


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

export default function PaintingCard({ name, description, id, imgUrl,pID }) {
  const classes = useStyles();
  const [likeColor, setLikeColor] = useState("");
  const [userInfo, setUserInfo] = useContext(UserContext);


  const addLike = () => {
    const newLike = {
      email: userInfo.email,
      paintingID: id,
      paintingname: name,
    }
    console.log(userInfo.like.find(like => like.paintingID === id));
    if (userInfo.like.find(like => like.paintingID === id)) {
      console.log("test")
      fetch('http://34.68.103.79:8000/paintings/unlike', {
        method: "POST",
        body: JSON.stringify(newLike),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
        .then(data => {
          console.log(data);
        })
        setUserInfo({
          ...userInfo,
          like:[userInfo.like.filter(like => like.paintingID !== id)]})
      setLikeColor("blue");
    } else {
      setUserInfo({
        ...userInfo,
        like:[...userInfo.like,[{paintingID:id,name:name}]]})

      fetch('http://34.68.103.79:8000/paintings/like', {
        method: "POST",
        body: JSON.stringify(newLike),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
        .then(data => {
          console.log(data);
        })
      setLikeColor("red")
      console.log(userInfo)
    }
  }

  const handleRating = (e)=>{console.log(e.rating)
    if(!userInfo.userID){
      alert("pls login");
    }
    const newRating = {
      userID: userInfo.userID,
      pID: pID,
      rating: e.rating
    }
    fetch(`${local}:8000/paintings/rating`, {
        method: "POST",
        body: JSON.stringify(newRating),
        headers: { 'Content-Type': 'application/json' }
      }).then(res => res.json())
        .then(data => {
          console.log(data);
        })
  }

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
    <CardActions>
      {/* {console.log(userInfo.rating)} */}
      {console.log(pID)}
    <Rater total={5} rating={
      userInfo.userName!=="" && userInfo.rating.find((rate)=>rate.pID===pID)?
      userInfo.rating.find((rate)=>rate.pID===pID).rating
      :0} 
    onRate={handleRating}/>
    <Button size="small" color="primary">
        Learn More
        </Button>

      <Button>
        {/* {(userInfo.like===[])?
        <FavoriteBorder style={{color:setLikeColor}} className={classes.button} onClick={addLike} />
        : */}
        <FavoriteBorder color={
          userInfo.like.find(like => like.paintingID === id) ?
            "secondary"
            : "primary"
        } style={{color:likeColor}} className={classes.button} onClick={addLike} />
      {/* } */}
      </Button>

     
    </CardActions>
  </Card>
);
}
