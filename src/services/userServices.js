import axios from "axios";
const SERVER_URL = "";

const getUsers = () => {
    const body = {}
  return axios
    .get(`${SERVER_URL}/users/getusers`, body)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const getUserGarage = (id) => {
    const body = {}
  return axios
    .get(`${SERVER_URL}/users/${id}/getgarage`, body)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const getUserById = (id) => {
    const body = {}
  return axios
    .get(`${SERVER_URL}/users/getuser/${id}`, body)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

const createUser = (user) => {
  return axios
    .post(`${SERVER_URL}/createuser`, user)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
