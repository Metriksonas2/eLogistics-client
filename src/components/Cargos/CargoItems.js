import EditIcon from "../UI/Icons/EditIcon";
import '../UI/Table.css';
import authService from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import CargoDeleteConfirmationModal from "./CargoDeleteConfirmationModal";
import PostService from "../../services/post.service";

const CargoItems = (props) => {
    const cargos = props.cargos;
    const includeActions = authService.isAdmin() ? true : props.includeActions;
    const navigate = useNavigate();

    const handleCargoDelete = async (e) => {
        const id = e.target.dataset.id;
        e.preventDefault();
        try {
            await PostService.deleteCargo(id).then(
                (response) => {
                    navigate("/home?cargodeleted=true");
                    window.location.reload();
                },
                (error) => {
                    if (error.response && error.response.status === 403) {
                        console.log(error.response);
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Identifier</th>
                    <th scope="col">Color</th>
                    <th scope="col">Total weight</th>
                    { includeActions ? (<th scope="col">Actions</th>) : '' }
                </tr>
            </thead>
            <tbody>
            {cargos.map((cargo, i) => (
                <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <td>
                        {cargo?.name}
                    </td>
                    <td style={(cargo?.name === "n/a" ? {color: "red"} : {})}>
                        {cargo?.identifier}
                    </td>
                    <td>
                        {cargo?.color}
                    </td>
                    <td>
                        {cargo?.totalWeight}
                    </td>
                    { includeActions
                        ? (
                            <td className="actions">
                                <Link to={`/cargos/${cargo?.id}/edit`} className="btn btn-primary">
                                    <EditIcon />
                                </Link>
                                <CargoDeleteConfirmationModal handleCargoDelete={handleCargoDelete} id={cargo?.id} />
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

export default CargoItems;