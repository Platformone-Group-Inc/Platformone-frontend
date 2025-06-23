import API from "../axios-client";

export interface Technology {
  category: string;
  slug: string;
  items: TechnologyItem[];
}

export interface TechnologyItem {
  question: string;
  answer: string;
  _id: string;
}
/**
 * Fetches all technology for a given organization ID
 * @param {string | number} organizationId
 * @returns {Promise<{data:{technologies:Technology[]}}>}
 */
export const getTechnologyQueryFn = async (
  organizationId?: string
): Promise<{ data: { technologies: Technology[] } }> => {
  const response = await API.get(
    `/technology/tech-responses/organization/${organizationId}`
  );
  return response?.data;
};
