import axios from "axios";

const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data).catch(e => { throw e.response ? e.response.data : { code: e.code, message: e.message} });

export default fetcher;