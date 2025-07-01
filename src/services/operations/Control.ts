import API from "../axios-client";

/**
 * Fetches control families for a given organization
 * @param {string} organizationId
 * @returns {Promise<ControlFamily[]>}
 */
export const getControlFamiliesByOrganizationQueryFn = async (
  organizationId: string | null
) => {
  const response = await API.get(
    `/controlFamilies/control-families/framework/${organizationId}`
  );
  return response?.data;
};

export interface ControlResponse {
  data: Control[];
  page: number;
  currentPage: number;
  totalPages: number;
  limit: number;
  totalDocs: number;
}

export interface Control {
  _id: string;
  name: string;
  description: string;
  identifier: string;
  level: number;
  status: string;
  controlFamilyId: string;
  assignments: any[];
  isOriginal: boolean;
  organizationId: null;
  createdAt: Date;
  assignedUser: null;
  framework_id: string;
  __v: number;
  controlFamily: ControlFamily;
}

export interface ControlFamily {
  _id: string;
  name: string;
  description: string;
  identifier: string;
  order: number;
  status: string;
  frameworkId: string;
  isOriginal: boolean;
  organizationId: null;
  controls: string[];
  createdAt: Date;
  assignedUser: null;
  __v: number;
}

/**
 * Fetches all controls associated with the given control family
 * @param {string} controlFamilyId
 * @returns {Promise<Control[]>}
 */
export const getControlByControlFamiliesQueryFn = async (
  controlFamilyId?: string | null,
  frameworkId?: string | null,
  all: boolean = false,
  page: number = 1,
  limit: number = 10
) => {
  const params = new URLSearchParams();

  if (all && frameworkId) {
    params.append("all", "true");
    params.append("frameworkId", frameworkId);
  } else if (controlFamilyId) {
    params.append("controlFamilyId", controlFamilyId);
  } else {
    throw new Error(
      "Either controlFamilyId or frameworkId with all=true must be provided."
    );
  }

  params.append("page", page.toString());
  params.append("limit", limit.toString());

  const response = await API.get<ControlResponse>(
    `/controls/get-controls-by-family?${params.toString()}`
  );
  return response?.data;
};
