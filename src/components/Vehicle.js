import React from "react";
import VehicleInfo from "./Vehicles/VehicleInfo";

const Vehicle = () => {
    return (
        <div>
            <div className="text-center">
                <h2>Specific info about selected vehicle</h2>
            </div>
            <br/>
            <VehicleInfo includeActions={true}/>
        </div>
    );
};

export default Vehicle;
