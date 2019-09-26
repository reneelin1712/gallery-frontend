import React,{useState, useEffect} from "react";
import NavBar from "../component/NavBar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Card from "../component/PaintingCard";
import Themes from "../component/Themes";




export default class Painting extends React.Component {
   
 
  // const [paintings, setPaintings]=useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:8000/paintings")
  //     .then(res => res.json())
  //     .then(data => {
  //      setPaintings(data)
  //      console.log(paintings)
  //     });
  // },[]);
    state={
      paintings:[]
    }

  componentDidMount(){
    fetch("http://104.154.46.103:8000/paintings")
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
              id={painting._id} />
            </Grid>
              </>)}
           

         
          </Grid>
        </Grid>
      </Grid>
    </>
  );
            }
}
