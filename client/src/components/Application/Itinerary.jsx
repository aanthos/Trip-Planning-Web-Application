import React,{Component} from 'react'
import {Form, FormGroup, Button, Input, Label, Table} from "reactstrap";

class ItineraryTable extends Component {
    constructor(props) {
        super(props);
        this.setOptionLatLong = this.setOptionLatLong.bind(this);
        this.reverseTrip = this.reverseTrip.bind(this);
        this.changeStart = this.changeStart.bind(this);
        this.removePlace = this.removePlace.bind(this);
        this.state = {
            optionLatitude: false,
            optionLongitude: false
        };
    }

    //builds distances uses by itinerary
    buildDistance() {
        let data = [0];
        this.props.trip.distances.map((key, index) => {
            if (index > 0) {
                data[index] = this.props.trip.distances[index - 1] + data[index-1];
            }
        });
        return data;
    }

    buildLegDistance() {
        let data = [0];
        this.props.trip.distances.map((key, index) => {
            if (index > 0) {
                data[index] = this.props.trip.distances[index - 1];
            }
        });
        return data;
    }

    calcTotal() {
        let total = 0;
        this.props.trip.distances.map((key, index) => {
            total += this.props.trip.distances[index];
        });
        return total;
    }


    setOptionLatLong(event) {
        this.setState({[event]: !this.state[event]});
    }

    reverseTrip() {
        let data = this.props.trip;
        data.places = data.places.reverse();
        this.props.updateBasedOnResponse(data);
    }

    changeStart(index) {
        let data = this.props.trip;
        let length = data.places.length;
        for(let i = 0; i < index; i++){
            let temp = data.places[0];
            for (let j = 0; j < length - 1; j++){
                data.places[j] = data.places[j+1];
            }
            data.places[length-1] = temp;
        }
        this.props.updateBasedOnResponse(data);
    }

    removePlace(index){
        if (this.props.trip.places.length > 1) {
            let data = this.props.trip;
            data.places.splice(index, 1);
            this.props.updateBasedOnResponse(data);
        }
    }

    renderthead(){
      const latitudeStyle = this.state.optionLatitude ? {} : {display: 'none'};
      const longitudeStyle = this.state.optionLongitude ? {} : {display: 'none'};
        return(
          <thead>
          <tr>
            <th>#</th>
            <th>Place</th>
            <th>Leg Distance</th>
            <th>Total Distance</th>
            <th style={latitudeStyle}>Latitude</th>
            <th style={longitudeStyle}>Longitude</th>
            <th>Change Start</th>
            <th></th>
          </tr>
          </thead>
        )
    }

    rendertr() {
      let data = this.buildDistance();
      let data2 = this.buildLegDistance();
      const latitudeStyle = this.state.optionLatitude ? {} : {display: 'none'};
      const longitudeStyle = this.state.optionLongitude ? {} : {display: 'none'};
      return (
        <div>
          {this.props.trip.places.map((key, index) => (
            <tr key={key + index + data[index] + key.latitude + key.longitude + 1}>
              <td key={data[index] + key + index + key.latitude + key.longitude + 2}>{index + 1} </td>
              <td key={key + index + data[index] + key.latitude + key.longitude + 3}>{key.name}</td>
              <td key={key.latitude + key.longitude + 4 + key + index + data[index]}>{data2[index]}</td>
              <td key={5 + key.latitude + key + index + data[index] + key.longitude}>{data[index]}</td>
              <td key={key.latitude + index + data[index] + 6 + key.longitude + key} style={latitudeStyle}>{key.latitude}</td>
              <td key={key + index + key.longitude + 7 + data[index] + key.latitude} style={longitudeStyle}>{key.longitude}</td>
              <td key={data[index] + index + key.longitude + 8 + key + key.latitude}>
                <Button className="itinButton" value="start" onClick={() => this.changeStart(index)}>Start Here</Button></td>
              <td key={key + 9 + index + data[index] + key.latitude + key.longitude}>
                <Button className="itinButton" value="bye" onClick={() => this.removePlace(index)}>&times;</Button></td>
            </tr>
          ))}
        </div>
      );
    }


    render() {
        let total = this.calcTotal();
        let testArr = ['optionLatitude','optionLongitude'];
        return (
            <div>
              <Table hover>
                  {this.renderthead()}
                  <tbody>
                  {this.rendertr()}
                  </tbody>
              </Table>
              <div>Select additional options for itinerary: </div>
              <Form>
                {testArr.map((value) =>
                  <FormGroup check inline key={value+1}>
                    <Label check key={value+2}>
                      <Input type="checkbox" value={value} key={value+3}
                             onClick={(event) => this.setOptionLatLong(event.target.value)}/> {value.substr(6, value.length)}
                    </Label>
                  </FormGroup>)}
              </Form>
              <Button value="reverse" className="btn-outline-dark unit-button" onClick={this.reverseTrip}>Reverse Trip</Button>
              <Label sm={{ size: 'auto', offset: 6 }} className="labelpop">
                  Total Round Trip Distance: {total}
              </Label>
            </div>)
    }
}
export default ItineraryTable;