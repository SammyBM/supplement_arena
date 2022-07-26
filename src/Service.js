import { ROUTES } from "./constantes";

export default class Service {
  static getData(type) {
    const options = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    };

    return new Promise((resolve, reject) => {
      fetch(ROUTES.API_ROUTE + type + ".php?", options)
        .then((response) => response.json())
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static getDataQuery(type, variable, userData) {
    const options = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    };

    return new Promise((resolve, reject) => {
      fetch(ROUTES.API_ROUTE + type + ".php?" + variable + userData, options)
        .then((response) => response.json())
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  static postData(type, userData) {
    return new Promise((resolve, reject) => {
      fetch(ROUTES.API_ROUTE + type + ".php", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(userData),
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  static changePage(newpage) {
    window.location = ROUTES.LOCAL_ROUTE + newpage;
  }
  static getSQL(type) {
    const options = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
    };

    return new Promise((resolve, reject) => {
      fetch(ROUTES.API_ROUTE + type + ".sql?")
        .then((response) => response.json())
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}