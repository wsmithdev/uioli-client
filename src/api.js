import axios from "axios";
const SBASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

/** API Class.
 *
 * Static class tying together methods used to get/send to the API.
 *
 */

export default class Api {
  // the token for interactive with the API will be stored here.
  static token = "";

  // Request method
  static async request(endpoint, data = {}, method = "get") {
    //console.debug("API Call:", endpoint, data, method, this.token);

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
  static async updateUser({ first_name, last_name, email }, token, id) {
    console.log(email);
    this.token = token;
    let res = await this.request(
      `users/${id}`,
      { first_name, last_name, email },
      "patch"
    );
    return res.user;
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
