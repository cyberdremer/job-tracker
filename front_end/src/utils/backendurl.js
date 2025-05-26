const env = import.meta.env.VITE_REACT_ENV;
const localhost = import.meta.env.VITE_LOCALHOST;
const port = import.meta.env.VITE_LOCALHOST_PORT;
const deploymentUrl = import.meta.env.VITE_DEPLOYED_BACKEND_URL;
const localhostAddress = localhost + ":" + port;

const backendUrl = env === "dev" ? localhostAddress : deploymentUrl;

export default backendUrl;
