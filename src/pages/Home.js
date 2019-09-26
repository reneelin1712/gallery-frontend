import React from "react";
import NavBar from "../component/NavBar";
import Banner from "../component/Banner";

export default class Home extends React.Component{
  state = {
    signupStatus: false
  }

  onClickSignupHandler

  render(){

  return (
    <>
      <NavBar onClickSignup={this.onClickSignupHandler} />
      <Banner />
    </>
  );
}
}
