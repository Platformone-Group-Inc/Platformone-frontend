import API from "../axios-client";


/**
 * Fetches all frameworks
 * @returns {Promise<Framework[]>}
 */
export const getFrameworksQueryFn = async () => {
   const response = await API.get("/frameworks")
   return response?.data
};



/**
 * Fetches all frameworks for a given organization ID
 * @param {string | number} organizationId
 * @returns {Promise<Framework[]>}
 */
export const getFrameworksByOrganizationQueryFn = async (organizationId: any) => {
   const response = await API.get(`/frameworks/organization/${organizationId}`)
   return response?.data
};


// export const cloneFullFrameworkQueryFn = async (organizationId: string, frameworkId: string) => {
//    const response = await API.post(`/frameworks/cloneFullFramework`, { organizationId: organizationId, framework: frameworkId })
//    console.log(response)
// };


