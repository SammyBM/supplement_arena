import { ROUTES } from "./constantes";
var Twitter = require('twitter');

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

  // static async getTweets() {
  //   return new Promise((resolve, reject)=>{
  //     const client = new Twitter({
  //       consumer_key: '6rlUvwKDyp1KNjIW5OWuYQcTk', 
  //       consumer_secret: 'swBqTxvDnGiW3M0OOR48Lryd4mHCKZscebM0fy69ii0C4iJnek', 
  //       access_token_key: '1154076600-91WCVwYBbqtcH5ziVQNrURy8eeYy4fbUvlft9ud', 
  //       access_token_secret: 'gymzbp8J5ZHAyawroL8sQQ4tmodqPaqM65GvX7pNmajRF'
  //     })

  //     client.get("trends/place.json", {
  //       id:1
  //     })
  //     .then((response) => response.json())
  //     .then((res) => {
  //       resolve(res)
  //     })
  //     .catch((error)=>{
  //       reject(error)
  //     })

  //     // fetch("url")
  //     // .then((response) => response.json())
  //     // .then((res)=> {
  //     //   resolve(res);
  //     // })
  //     // .catch((error)=>{
  //     //   reject(error)
  //     // })
  //   })
  // }

}