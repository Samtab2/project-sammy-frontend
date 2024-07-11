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

  getArticles() {
    return fetch(`${this._baseUrl}/items`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addArticle(data) {
    return fetch(`${this._baseUrl}/items`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  };


  removeArticle = (selectedArticle) => {
    const selectedArticle_id = selectedArticle._id;
    return fetch(`${this._baseUrl}/items/${selectedArticle_id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  };
}
export default Api;
