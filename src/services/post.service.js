import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "../services/auth.service";

const API_URL = "https://127.0.0.1:8000/api";

const getAllCargos = () => {
  return axios.get(API_URL + "/cargos", {
    headers: {...authHeader(), Accept: 'application/json'},
  });
};

const getCargo = (id) => {
    return axios.get(API_URL + `/cargos/${id}`, {
        headers: {...authHeader(), Accept: 'application/json'},
    });
};

const getUserCargos = () => {
  const userId = AuthService.parseJwt().id;

  return axios.get(API_URL + `/users/${userId}/cargos`, {
    headers: {...authHeader(), Accept: 'application/json'},
  });
};

const getVehicles = () => {
  return axios.get(API_URL + "/vehicles", {
    headers: {...authHeader(), Accept: 'application/json'},
  });
};

const createCargo = (name, identifier, color, totalWeight) => {
    const userId = AuthService.parseJwt().id;

    return axios
        .post(API_URL + `/cargos`, {
            name: name,
            identifier: identifier,
            color: color,
            totalWeight: parseFloat(totalWeight),
            owner: `/api/users/${userId}`
        }, {
            headers: {...authHeader(), Accept: 'application/json'},
        });
}

const getVehicle = (id) => {
  return axios.get(API_URL + `/vehicles/${id}`, {
    headers: {...authHeader(), Accept: 'application/json'},
  });
};

const getVehicleCargos = (vehicleId) => {
    return axios.get(API_URL + `/vehicles/${vehicleId}/cargos`, {
        headers: {...authHeader(), Accept: 'application/json'},
    });
}

const editCargo = (id, name, identifier, color, totalWeight) => {
  return axios
      .put(API_URL + `/cargos/${id}`, {
        name: name,
        identifier: identifier,
        color: color,
        totalWeight: parseFloat(totalWeight),
      }, {
        headers: {...authHeader(), Accept: 'application/json'},
      });
}

const deleteCargo = (id) => {
    return axios
        .delete(API_URL + `/cargos/${id}`, {
            headers: {...authHeader(), Accept: 'application/json'},
        })
}

const postService = {
  getAllCargos,
  getCargo,
  getUserCargos,
  getVehicleCargos,
  getVehicles,
  getVehicle,
  createCargo,
  editCargo,
  deleteCargo,
};

export default postService;
