import React from 'react';
import PopularCard from "./PopularCard";
import {local,gcp} from "../config"

const styles = {
    popular:{
        display:"flex",
        justifyContent: "center",
    }
}

export default class Popular extends React.Component {
    
    state={
        popular:[{
            name:"sky",
            description: "test",
            id:3,
            imgUrl:"../images/gallery.jpeg"
        },
        {
            name:"sky",
            description: "test",
            id:3,
            imgUrl:"../images/gallery.jpeg"
        },
        {
            name:"sky",
            description: "test",
            id:3,
            imgUrl:"../images/gallery.jpeg"
        }]
    }

    componentDidMount(){
        fetch(`${local}:8000/paintings/popular`)
        .then(res => res.json())
        .then(data => {
         this.setState({popular:data})
         console.log(this.state.popular)
        });

    }
    
    render(){
        const {popular} = this.state
        return(
            <>
            <div style={ {textAlign:"center"}}>
            <h2>Most Popular</h2>

            <div style={styles.popular}>
        {popular.map((painting)=>{
            return(
            <div style={{ margin:"1% 3%"}}>
            <PopularCard 
            name={painting.name}
            description={painting.description}
            id={painting.id}
            imgUrl={painting.imageUrl}
           
            />
            </div>
            )
        })}
        </div>
        </div>
        </>
        )
    }


}