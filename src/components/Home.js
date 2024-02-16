import React from "react";
import Notes from "../components/Notes";

const Home = (props) => {
  // const {showAlert}=props
  
  return (
    <div className="container my-3">
      <Notes showAlert={props.showAlert}/>
    </div>
  );
};

export default Home;
