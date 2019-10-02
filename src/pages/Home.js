import React from "react";
import NavBar from "../component/NavBar";
import Banner from "../component/Banner";
import Popular from "../component/Popular";

export default class Home extends React.Component{
  state = {
    signupStatus: false,
    username:''
  }

  // onClickSignupHandler

  render(){

  return (
    <>
      <NavBar onClickSignup={this.onClickSignupHandler}  />
      <Banner />
      <Popular />
    </>
  );
}
}
