import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";
import AuthService from "../services/auth.service";
import { useNavigate } from "react-router-dom";
import Spinner from "./UI/Spinner";
import CargoItems from "./Cargos/CargoItems";
import CargoCreateModal from "./Cargos/CargoCreateModal";

const UserCargos = () => {
  const [cargos, setCargos] = useState([]);
  const [arrayIsEmpty, setArrayIsEmpty] = useState(false);
  const navigate = useNavigate();

    const handleCreate = async (e) => {
        const name = e.target.name.value;
        const identifier = e.target.identifier.value;
        const color = e.target.color.value;
        const totalWeight = e.target.totalWeight.value;

        e.preventDefault();
        try {
            await PostService.createCargo(name, identifier, color, totalWeight).then(
                (response) => {
                    navigate("/user/cargos?cargocreated=true");
                    window.location.reload();
                },
                (error) => {
                    if (error.response && error.response.status === 403) {
                        // setError('Access denied');
                        console.log(error.response);
                    }
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        PostService.getUserCargos().then(
            (response) => {
                setCargos(response.data);
                if (response.data.length === 0) {
                    setArrayIsEmpty(true);
                }
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
          <h2>All your personal eLogistics cargos</h2>
          <h3>Cargos that you have created.</h3>
        </div>
        <br/>
        <CargoCreateModal handleCreate={handleCreate} />
        <br/>
        {arrayIsEmpty
            ? <div className="alert alert-info" role="alert">
                You haven't created any cargos yet.
            </div>
            : cargos.length === 0 ? <Spinner /> : <CargoItems cargos={cargos} includeActions={true}/>
        }
        {/*{cargos.length === 0 ? <Spinner /> : <CargoItems cargos={cargos} includeActions={true}/>}*/}
      </div>
  );
};

export default UserCargos;
