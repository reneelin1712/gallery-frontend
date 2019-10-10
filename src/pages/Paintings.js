import React,{useState, useEffect} from "react";
import NavBar from "../component/NavBar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../component/PaintingCard";
import Themes from "../component/Themes";
import Recommend from "../component/Recommend";
import {local,gcp,gcpInsGroup} from "../config"


export default class Painting extends React.Component {
   
 
  // const [paintings, setPaintings]=useState([]);

  // useEffect(() => {
  //   fetch("http://35.184.185.218:8000/paintings")
  //     .then(res => res.json())
  //     .then(data => {
  //      setPaintings(data)
  //      console.log(paintings)
  //     });
  // },[]);
    state={
      paintings:[],
      recommendation:[]
    }

  componentDidMount(){
    fetch(`${gcpInsGroup}:8000/paintings`)
        .then(res => res.json())
        .then(data => {
         this.setState({paintings:data})
         console.log(this.state.paintings)
        });

  }

  render(){
    
  return (
    <>
      <NavBar />
      <Grid container spacing={3}>
       
        <Grid item xs={3} >
          <Themes />
          <Recommend />
        </Grid>
        <Grid item xs={9}>
          <Grid container spacing={1} style={{ marginTop: 10 }}>
            <Grid item xs={12}>
              <h1 style={{ textAlign: "center" }}>ALL PAINTINGS</h1>
            </Grid>
            {this.state.paintings.map(painting=>
            // console.log(painting)
              <>
               <Grid item xs={4}>
              <Card name={painting.name} description={painting.description}
              id={painting._id} imgUrl={painting.imageUrl} pID={painting.pID}/>
            </Grid>
              </>)}
           

         
          </Grid>
        </Grid>
      </Grid>
    </>
  );
            }
}
