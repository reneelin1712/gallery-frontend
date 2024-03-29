import React,{useContext, useEffect}  from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@material-ui/icons/Inbox";
import Image from "../images/gallery.jpeg";
import { UserContext } from '../Context';
import {local,gcp,gcpInsGroup} from "../config";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    marginTop: "12%",
    marginLeft: 10
  },
  img:{
      width:"80%"
  }
}));

export default function Recommend() {
  const classes = useStyles();
  // const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [userInfo, setUserInfo] = useContext(UserContext);
  const [recommend,setRecommend] = React.useState([])

  useEffect(()=>{
    const userID = userInfo.userID
    console.log(userID)
    fetch(`${gcpInsGroup}:8000/recommendation/${userID}`)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          const recommendation = data.map(item => item.recommendation[0])
          setRecommend(recommendation)
          console.log(recommendation)
          
        })
  },[userInfo])


  return (
    <div className={classes.root}>
      <h2>Recommendation for You</h2>
      <Divider />
      
      { recommend.length>0 ? 
      recommend.map((recommendation,key) =>
        <List key={key} component="nav" aria-label="main mailbox folders">
        <ListItem>
          <ListItemText primary={recommendation.name} />
        </ListItem>

        <ListItem>
        <img src={recommendation.imageUrl} className={classes.img}></img>
        </ListItem>
      
      </List>
        )
      :null
      }
    </div>
  );
}
