import * as React from 'react';
export default class CarsOverview extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectCar = (car) => {
            this.setState({ selectedCar: car });
        };
        this.renderCarsList = (cars) => {
            if (!cars || cars.length === 0) {
                return (<p>No cars</p>);
            }
            return (<ul>{cars.map((car, index) => <li key={index} onClick={() => this.handleSelectCar(car)}>{car.make} {car.model}</li>)}</ul>);
        };
        this.renderCarInfo = (car) => {
            if (!car) {
                return null;
            }
            return (<div className="CarInfo">
                <h2>{`${car.make} ${car.model}`}</h2>
                <section>{car.engine}</section>
            </div>);
        };
        this.state = {
            selectedCar: null
        };
    }
    render() {
        return (<div>
                <h1>Cars Overview</h1>

                <div className="Cars__List">
                    {this.renderCarsList(this.props.cars)}
                </div>

                {this.renderCarInfo(this.state.selectedCar)}
            </div>);
    }
}
//# sourceMappingURL=Overview.jsx.map