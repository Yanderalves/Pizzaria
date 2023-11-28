import axios, { AxiosError } from "axios";

import { parseCookies } from "nookies";
import { signOut } from "../context/AuthContext";
import { AuthtokenError } from "./errors/AuthTokenError";


export function setupAPIClient(context = undefined) {
    let cookies = parseCookies(context);

    const api = axios.create({
        baseURL: "http://localhost:3030",
        headers: {
            Authorization: `Bearer ${cookies['@nextauth.token']}`
        }
    })

    api.interceptors.response.use(response => {
        return response;
    }, (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Desloga
            if (typeof window !== 'undefined') {
                signOut();
            } else {
                return Promise.reject(new AuthtokenError())
            }
        } else {
            return Promise.reject(error);
        }
    });
    return api;
}

