import API from "../axios-client";

/**
 * Fetches control families for a given organization
 * @param {string} organizationId
 * @returns {Promise<ControlFamily[]>}
 */
export const getControlFamiliesByOrganizationQueryFn = async (organizationId: string  | undefined) => {
    const response = await API.get(`/controlFamilies/control-families/framework/${organizationId}`);
    return response?.data;
};