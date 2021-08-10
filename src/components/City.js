import React from "react";
import Datasheet from "../lib/DataSheet";
import Button from "./Button/Button";

export default class HouseRecommendation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [
        [
          { value: "" },
          { value: "House1" },
          { value: "" },
          { value: "" },
          { value: "Parking" },
          { value: "" },
          { value: "" },
          { value: "Restaurant" },
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "Coffee Shop" },
          { value: "" },
          { value: "" },
          { value: "House2" },
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "Market" },
          { value: "" },
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "House3" },
          { value: "" },
          { value: "" },
          { value: "" },
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "Spa" },
          { value: "Movie Theatre" },
        ],
        [
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
        ],
        [
          { value: "House4" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "" },
          { value: "Salon" },
        ],
      ],
      recommendedHouse: "",
      ifShowResult: false,
    };
    this.computerRecommendedHouse(this.state.grid);
  }
  valueRenderer = (cell) => cell.value;
  getClosedHouse = (housesArr) => {
    housesArr.sort(function (a, b) {
      return a.totalDistance - b.totalDistance;
    });
    return housesArr[0].name;
  };
  computerRecommendedHouse = (grid) => {
    const housesArr = [];
    const placesArr = [];
    //Assigning values to Array
    for (let i = 0; i < grid.length; i++) {
      const gRow = grid[i];
      for (let j = 0; j < gRow.length; j++) {
        const grCol = gRow[j];
        if (grCol.value) {
          if (
            grCol.value.toLowerCase().indexOf("house") > -1 ||
            grCol.value.toLowerCase().indexOf("home") > -1
          ) {
            housesArr.push({
              name: grCol.value,
              xCor: i,
              yCor: j,
              totalDistance: 0,
            });
          } else {
            placesArr.push({
              name: grCol.value,
              xCor: i,
              yCor: j,
            });
          }
        }
      }
    }
    console.log(housesArr);
    console.log(placesArr);
    for (const houseObj of housesArr) {
      for (const placeObj of placesArr) {
        const xDis = Math.abs(placeObj.xCor - houseObj.xCor);
        const xDisSquared = xDis * xDis;

        const yDis = Math.abs(placeObj.yCor - houseObj.yCor);
        const yDisSquared = yDis * yDis;

        const distance = Math.sqrt(xDisSquared + yDisSquared);
        houseObj.totalDistance += distance;
      }
      console.log(
        "Total distance of house from all places combined: ",
        houseObj
      );
    }
    console.log("Houses Array: ", housesArr);
    const closestHouse = this.getClosedHouse(housesArr);
    console.log("Closest house to all places: ", closestHouse);
    this.setState({ recommendedHouse: closestHouse });
  };
  onCellsChanged = (changes) => {
    this.setState({ ifShowResult: false });
    const grid = this.state.grid;
    changes.forEach(({ cell, row, col, value }) => {
      grid[row][col] = { ...grid[row][col], value };
    });
    this.setState({ grid });
    this.computerRecommendedHouse(grid);
  };
  onItemClick = (event) => {
    const grid = this.state.grid;
    this.setState({ ifShowResult: true });
    this.computerRecommendedHouse(grid);
  };
  onContextMenu = (e, cell, i, j) =>
    cell.readOnly ? e.preventDefault() : null;

  render() {
    return (
      <div>
        <Datasheet
          data={this.state.grid}
          valueRenderer={this.valueRenderer}
          onContextMenu={this.onContextMenu}
          onCellsChanged={this.onCellsChanged}
        />
        <Button onClick={this.onItemClick}>Show Recommended House</Button>
        <h1>
          {this.state.ifShowResult ? (
            <div className="result">
              Recommended House is : {this.state.recommendedHouse}
            </div>
          ) : null}
        </h1>
      </div>
    );
  }
}
