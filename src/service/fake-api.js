import axios from 'axios';

const fakeapi = axios.create({
  baseURL: 'http://localhost:3333/'
});

export default fakeapi;