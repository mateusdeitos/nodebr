const axios = require('axios');

const api = axios.create({ baseURL: 'https://swapi.dev/api' })

const obterPessoas = async (nome) => {
    const response = await api.get(`/people?search=${nome}&format=json`);
    return response.data;
}

module.exports = {
    obterPessoas
}