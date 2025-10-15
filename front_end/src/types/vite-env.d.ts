/// <reference types="vite/client" />


interface ViteTypeOptions{

}

interface ImportMetaEnv {
    readonly VITE_LOCALHOST: string;
    readonly VITE_LOCALHOST_PORT: string | number;
    readonly VITE_REACT_ENV: "dev" | "prod" | "test";
    readonly VITE_DEPLOYED_BACKEND_URL: string;
}


interface ImportMeta {
    readonly env: ImportMetaEnv;
}


