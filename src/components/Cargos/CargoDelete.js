import React, {useEffect, useState} from "react";
import PostService from "../../services/post.service";
import {useNavigate, useParams} from "react-router-dom";
import '../forms.css';
import AuthService from "../../services/auth.service";
import Spinner from "../UI/Spinner";

const CargoEdit = () => {
    const user = AuthService.getCurrentUser();
    const { id } = useParams();
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await PostService.deleteCargo(id).then(
                (response) => {
                    navigate("/home?cargodeleted=true");
                    window.location.reload();
                },
                (error) => {
                    if (error.response && error.response.status === 403) {
                        setError('Access denied');
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            {!loaded
                ? <Spinner/>
                : <form className="input-form" onSubmit={handleDelete}>
                    <h3>Edit cargo</h3>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name"
                               placeholder="Enter name" value={name}
                               onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="identifier">Identifier</label>
                        <input type="text" className="form-control" id="identifier"
                               placeholder="Enter identifier" value={identifier}
                               onChange={(e) => setIdentifier(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="color">Color</label>
                        <input type="text" className="form-control" id="color"
                               placeholder="Enter color" value={color}
                               onChange={(e) => setColor(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="totalWeight">Total weight</label>
                        <input type="text" className="form-control" id="totalWeight"
                               placeholder="Enter total weight" value={totalWeight}
                               onChange={(e) => setTotalWeight(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            }
            <br/>
            {error
                ? <div className="alert alert-danger" role="alert">
                    {error}
                </div>
                : ""
            }
        </div>
    );
};

export default CargoEdit;
