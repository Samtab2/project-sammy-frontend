class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getNewsItems() {
    return fetch(`${this._baseUrl}/items`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  }

  postNews(data) {
    return fetch(`${this._baseUrl}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }
}


export default Api;