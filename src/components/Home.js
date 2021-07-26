import React, { Component } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap/";
import '../css/Home.css'
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      digimonData: [],
      show: false,
    };
  }

  componentDidMount = async () => {
    try {
      const alldataAPI = await axios.get(`${process.env.REACT_APP_SERVER}/`);
      const finalGetData = alldataAPI.data;
      console.log(finalGetData);
      this.setState({
        digimonData: finalGetData,
        show: true,
      });
    } catch {
      console.log("Ooops don't have data");
    }
  };

  createDigimonFAV = async (e, item) => {
    e.preventDefault();

    const dataForSend = {
      name: item.name,
      img: item.img,
      level: item.level,
    };
      await axios.post(`${process.env.REACT_APP_SERVER}/`, dataForSend);
  };

  render() {
    return (
      <>
        {this.state.show &&
          this.state.digimonData.map((item, idx) => {
            return (
              <>
                <Card
                  key={idx}
                  style={{
                    width: "20rem",
                    margin: "15px",
                    display: "inline-block",
                    border: ".5px solid",
                    backgroundColor: "#B3C6F3",
                  }}
                >
                  <Card.Img
                    variant="top"
                    src={item.img}
                    style={{ border: ".5px solid", backgroundColor: "red" }}
                  />
                  <Card.Body>
                    {/* <Card.Title>Card Title</Card.Title> */}
                    <Card.Text>{item.name}</Card.Text>
                    <Button
                      onClick={(e) => this.createDigimonFAV(e, item)}
                      variant="primary"
                    >
                      Add to FAV
                    </Button>
                  </Card.Body>
                </Card>
              </>
            );
          })}
      </>
    );
  }
}

export default Home;
