import API from "../axios-client";


export const getFrameworksQueryFn = async () => {
   const response = await API.get("/frameworks") 
   console.log(response)
};

export const getFrameworksByOrganizationQueryFn = async (organizationId: string) => {
   const response = await API.get(`/frameworks/organization/${organizationId}`) 
   return response?.data
};