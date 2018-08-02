import * as React from "react";

class Landing extends React.Component {
  state = {};

  render() {
    return (
      <div
        style={{
          display: "flex",
          backgroundImage: `url("woods.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          height: "95vh",
          width: "100vw"
        }}
      >
        <h1
          style={{
            margin: "auto",
            marginTop: "15vh",
            fontSize: 72,
            color: "#fff"
          }}
        >
          Vacation Found
        </h1>
      </div>
    );
  }
}

export default Landing;
