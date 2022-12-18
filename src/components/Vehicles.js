import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Spinner from "./UI/Spinner";
import VehicleItems from "./Vehicles/VehicleItems";

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        PostService.getVehicles().then(
            (response) => {
                setVehicles(response.data);
            },
            (error) => {
                // Invalid token
                if (error.response) {
                    switch (error.response.status) {
                        case 401:
                            AuthService.logout();
                            navigate("/login");
                            window.location.reload();
                            break;
                        case 403:
                            navigate("/home");
                            window.location.reload();
                            break;
                    }
                }
            }
        );
    }, []);

    return (
        <div>
            <div className="text-center">
                <h2>All available eLogistics vehicles</h2>
                <h3>You can check more information about each vehicle.</h3>
            </div>
            <br/>
            {vehicles.length === 0 ? <Spinner /> : <VehicleItems vehicles={vehicles} includeActions={true}/>}
        </div>
    );
};

export default Vehicles;
