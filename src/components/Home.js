import React, { useState, useEffect } from "react";
import PostService from "../services/post.service";
import AuthService from "../services/auth.service";
import HelperFunctionsServices from "../services/helper_functions.service";
import CargoItems from "./Cargos/CargoItems";
import Spinner from "./UI/Spinner";
import { useNavigate } from "react-router-dom";
import FlashMessage from "react-flash-message";

const Home = () => {
  const [cargos, setCargos] = useState([]);
  const [wasCargoEdited, setWasCargoEdited] = useState(false);
  const [wasCargoDeleted, setWasCargoDeleted] = useState(false);
  const navigate = useNavigate();
  const user = AuthService.getCurrentUser();

  useEffect(() => {
    if (user && user.token) {
        const wasCargoUpdatedValue = HelperFunctionsServices.getQueryParameter("cargoupdated");
        const wasCargoDeletedValue = HelperFunctionsServices.getQueryParameter("cargodeleted");

        if (wasCargoUpdatedValue === "true") {
            setWasCargoEdited(true);
        }
        if (wasCargoDeletedValue === "true") {
            setWasCargoDeleted(true);
        }

        PostService.getAllCargos().then(
            (response) => {
                setCargos(response.data);
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
    }
  }, []);

  return (
      <div>
          {
              user && user.token
                  ? (<div>
                      <div className="text-center">
                          <h2>All eLogistics cargos</h2>
                          <h3>These cargos are available for ordering.</h3>
                      </div>
                      {wasCargoEdited
                          ? <FlashMessage duration={6000} persistOnHover={true}>
                              <div className="alert alert-success" role="alert">
                                  Cargo was updated successfully!
                              </div>
                          </FlashMessage>
                          : ""
                      }
                      {wasCargoDeleted
                          ? <FlashMessage duration={6000} persistOnHover={true}>
                              <div className="alert alert-success" role="alert">
                                  Cargo listing was removed successfully!
                              </div>
                          </FlashMessage>
                          : ""
                      }
                      <br/>
                      { cargos.length === 0 ? <Spinner /> : <CargoItems cargos={cargos} includeActions={false}/> }
                  </div>)
                  : "You need to login"
          }

        </div>
    );
};

export default Home;
