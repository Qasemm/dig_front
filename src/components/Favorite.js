import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Form } from "react-bootstrap/";
export class Favorite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FavDigimon: [],
      show: false,
      showData: false,
      name: "",
      img: "",
      level: "",
      index: "",
    };
  }

  componentDidMount = async (req, res) => {
    try {
      const axiosGetUserData = await axios.get(`http://localhost:8000/fav`);
      const favoriteUserData = axiosGetUserData.data;
      this.setState({
        FavDigimon: favoriteUserData,
        show: true,
      });
    } catch {
      console.log("error");
    }
  };
  updateFavDigimon(idx) {
    this.setState({
      showData: true,
      name: this.state.FavDigimon[idx].name,
      img: this.state.FavDigimon[idx].img,
      level: this.state.FavDigimon[idx].level,
      index: idx,
    });
  }

  deleteFavDigimon = async (e, idx) => {
    e.preventDefault();
    const DleteData = await axios.delete(
      `http://localhost:8000/del/${this.state.FavDigimon[idx]._id}`
    );
    this.setState({
      FavDigimon: DleteData.data,
    });
  };

  changeName = (e) => {
    this.setState({
      name: e.target.name,
    });
  };
  changeImg = (e) => {
    this.setState({
      img: e.target.img,
    });
  };

  changeLevel = (e) => {
    this.setState({
      level: e.target.level,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const updateName = {
      name: this.state.name,
      img: this.state.img,
      level: this.state.level,
    };
    const urlUdate = `http://localhost:8000/up/${this.state.FavDigimon[this.state.index]._id}`;
    const updateDataDigimon = await axios.put(urlUdate, updateName);
    console.log(this.state.FavDigimon[this.state.index]._id);
    this.setState({
      FavDigimon: updateDataDigimon.data,
    });
  };

  render() {
    return (
      <>
        {this.state.showData && (
          <Form onSubmit={(e) => this.handleSubmit(e)}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>update link </Form.Label>
              <Form.Control
                onChange={this.changeImg}
                type="text"
                placeholder="Enter new path"
                value={this.state.img}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicname">
              <Form.Label>update name </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new name"
                value={this.state.name}
                onChange={this.changeName}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasiclevel">
              <Form.Label>update level </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new level"
                value={this.state.level}
                onChange={this.changeLevel}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        )}
        {this.state.show &&
          this.state.FavDigimon.map((item, idx) => {
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
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.level}</Card.Text>
                    <Button
                      style={{ margin: "5px" }}
                      onClick={() => this.updateFavDigimon(idx)}
                      variant="primary"
                    >
                      update
                    </Button>
                    <Button
                      onClick={(e) => this.deleteFavDigimon(e, idx)}
                      variant="danger"
                    >
                      Delete
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

export default Favorite;
