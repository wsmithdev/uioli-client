import axios from "axios";
const SBASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

export default class PlaidApi {
  static token = "";

  // Request method
  static async request(endpoint, data = {}, method = "get") {
    // console.debug("API Call:", endpoint, data, method, this.token);
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

  /* Request link token */
  static async getLinkToken() {
    let res = await this.request(`plaid/api/create_link_token`, {}, "post");
    return res.link_token;
  }

  /* Request access token */
  static async sendPublicToken(publicToken, user) {
    this.token = user.token;
    let res = await this.request(
      `plaid/api/swap_public_token`,
      { publicToken },
      "post"
    );
    return res;
  }

  /* Add cards */
  static async addCard(user) {
    this.token = user.token;
    let res = await this.request(`plaid/api/get_accounts`);
    return res;
  }
}
