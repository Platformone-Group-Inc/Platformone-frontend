
import API from "../axios-client";

type LoginType = {
    email: string;
    password: string;
};



export const loginMutationFn = async (data: LoginType) =>
    await API.post("/users/login", data);

export const getUserSessionQueryFn = async () => await API.get(`/users/sessions/current`);
