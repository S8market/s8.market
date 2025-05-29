// utils/getServerUrl.js
export const getServerUrl = () => {
    if (import.meta.env.MODE === "development") return import.meta.env.VITE_SERVER_URL_DEV;
    if (import.meta.env.MODE === "production") return import.meta.env.VITE_SERVER_URL;
    return import.meta.env.VITE_SERVER_URL_DEV;
};
