import * as React from 'react';
const Detail = ({ car }) => {
    return (<div className="CarDetail">
            <h1>{`${car.make} ${car.model}`}</h1>
            <p>Engine : {car.engine}</p>
            <p>Year : {car.year}</p>
            <p>Mileage : {car.mileage}</p>
            <p>Equipment :
            </p>
            <ul>{car.equipment && car
        .equipment
        .map((e, index) => <li key={index}>{e}</li>)}</ul>
        </div>);
};
export default Detail;
//# sourceMappingURL=Detail.jsx.map