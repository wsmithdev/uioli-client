import axios from "axios";

const SBASE_URL = process.env.SERVER_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

export default class Api {
  // the token for interactive with the API will be stored here.
  static token = "";

  // Request method
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method, this.token);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${SBASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${this.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Create a new user. */
  static async signup({ first_name, last_name, email, password }) {
    let res = await this.request(
      `users/`,
      { first_name, last_name, email, password },
      "post"
    );
    return res;
  }

  /** Login user. */
  static async login({ email, password }) {
    let res = await this.request(`auth/signin`, { email, password }, "post");
    return res;
  }

  /** Get details on a user */
  static async getUser(id, token) {
    this.token = token;
    let res = await this.request(`users/${id}`);
    return res.user;
  }

  /** Update user details */
  static async updateUser({ first_name, last_name }, token, id) {
    this.token = token;
    let res = await this.request(
      `users/${id}`,
      { first_name, last_name },
      "patch"
    );
    return res.user;
  }

  /** Update user: Applied for a job */

  static async apply(username, job_id, token) {
    this.token = token;
    let res = await this.request(
      `users/${username}/jobs/${job_id}`,
      {},
      "post"
    );
    return res;
  }

  /** Cards: Get all the cards from a user */
  static async getUserCards(user) {
    this.token = user.token;
    let res = await this.request(`cards`);
    return res.cards;
  }

  /** Cards: Update card usage frequency */
  static async updateFreq(user, days, card_id) {
    this.token = user.token;
    let res = await this.request(`cards/${card_id}`, { days }, "patch");
    return res;
  }

  /** Cards: Remove card */
  static async removeCard(user, card_id) {
    this.token = user.token;
    let res = await this.request(`cards/${card_id}`, {}, "delete");
    return res;
  }

  /** Cards: Toggle notifications */
  static async toggleNotifications(user, card_id) {
    this.token = user.token;
    let res = await this.request(`cards/notifications/${card_id}`, {}, "patch");
    return res;
  }




}
