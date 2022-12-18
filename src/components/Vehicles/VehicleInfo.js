import '../UI/Table.css';
import InfoIcon from "../UI/Icons/InfoIcon";
import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import PostService from "../../services/post.service";
import AuthService from "../../services/auth.service";
import Spinner from "../UI/Spinner";
import CargoItems from "../Cargos/CargoItems";

const VehicleInfo = (props) => {
    const { id } = useParams();
    const [vehicleCargos, setVehicleCargos] = useState([]);
    const [arrayIsEmpty, setArrayIsEmpty] = useState(false);
    const includeActions = props.includeActions;

    useEffect(() => {
        PostService.getVehicleCargos(id).then(
            (response) => {
                setVehicleCargos(response.data);
                if (response.data.length === 0) {
                    setArrayIsEmpty(true);
                }
            },
            (error) => {
                if (error.response && error.response.status === 403) {
                    // setError('Access denied');
                    console.log(error.response);
                }
            }
        );
    }, []);

    return (
        <div>
            {arrayIsEmpty
                ? <div className="alert alert-info" role="alert">
                    This vehicle doesn't have any cargos yet.
                </div>
                : (vehicleCargos.length === 0 ? <Spinner />
                    : <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Identifier</th>
                            { includeActions ? (<th scope="col">Actions</th>) : '' }
                        </tr>
                        </thead>
                        <tbody>
                        {vehicleCargos.map((cargo, i) => (
                            <tr key={i}>
                                <th scope="row">{i + 1}</th>
                                <td>
                                    {cargo?.name}
                                </td>
                                <td>
                                    {cargo?.identifier}
                                </td>
                                { includeActions
                                    ? (
                                        <td className="actions">
                                            <Link to={`/cargos/${cargo?.id}`} className="btn btn-primary">
                                                <InfoIcon />
                                            </Link>
                                        </td>
                                    )
                                    : ''
                                }
                            </tr>
                        ))}
                        </tbody>
                    </table>)
            }
        </div>
    );
}

export default VehicleInfo;