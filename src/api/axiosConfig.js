import axios from "axios";

const ip = window.location.host.substring(0, window.location.host.indexOf(":"));
const instance = axios.create({
    baseURL: `http://${ip}:8080`,
    // timeout: 1000,
    // headers: { "X-Custom-Header": "foobar" },
});

export default instance;
