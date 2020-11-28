import axios from "axios";
const SERVER_URL = "localhost:3005";

export const getCarById = (id) => {
    const body = {}
  return axios
    .get(`${SERVER_URL}/cars/getcar/${id}`, body)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const getCars = () => {
    const body = {}
  return axios
    .get(`${SERVER_URL}/cars/getcars`, body)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const editCar = (id, body) => {
  return axios
    .put(`${SERVER_URL}/cars/editcar/${id}`, body)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const createCar = (car) => {
  return axios
    .post(`${SERVER_URL}/cars/createcar`, car)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
