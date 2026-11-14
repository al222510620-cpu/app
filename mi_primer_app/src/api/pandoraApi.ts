import axios from "axios";

export const pandoraApi = axios.create({ timeout: 10000 });
