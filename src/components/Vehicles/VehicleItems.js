import '../UI/Table.css';
import InfoIcon from "../UI/Icons/InfoIcon";
import {Link} from "react-router-dom";
import EditIcon from "../UI/Icons/EditIcon";
import DeleteIcon from "../UI/Icons/DeleteIcon";
import AdminAccess from "../Admin/AdminAccess";

const VehicleItems = (props) => {
    const vehicles = props.vehicles;
    const includeActions = props.includeActions;

    return (
        <table className="table table-bordered">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">License Plate</th>
                <th scope="col">Fuel Type</th>
                <th scope="col">Gearbox</th>
                { includeActions ? (<th scope="col">Actions</th>) : '' }
            </tr>
            </thead>
            <tbody>
            {vehicles.map((vehicle, i) => (
                <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>
                        {vehicle?.licensePlate}
                    </td>
                    <td>
                        {vehicle?.fuelType}
                    </td>
                    <td>
                        {vehicle?.gearbox}
                    </td>
                    { includeActions
                        ? (
                            <td className="actions">
                                <Link to={`/vehicles/${vehicle?.id}`} className="btn btn-primary">
                                    <InfoIcon />
                                </Link>
                                <AdminAccess>
                                    <button type="button" className="btn btn-primary">
                                        <EditIcon />
                                    </button>
                                    <button type="button" className="btn btn-danger">
                                        <DeleteIcon />
                                    </button>
                                </AdminAccess>
                            </td>
                        )
                        : ''
                    }
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default VehicleItems;