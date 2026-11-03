import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";

export const BLOOD_GROUP_TABS = [
  { value: "", label: "All" },
  { value: "A(+)ve", label: "A(+)ve" },
  { value: "A(-)ve", label: "A(-)ve" },
  { value: "B(+)ve", label: "B(+)ve" },
  { value: "B(-)ve", label: "B(-)ve" },
  { value: "O(+)ve", label: "O(+)ve" },
  { value: "O(-)ve", label: "O(-)ve" },
  { value: "AB(+)ve", label: "AB(+)ve" },
  { value: "AB(-)ve", label: "AB(-)ve" },
];

export const fetchBloodData = async ({ queryKey }) => {
  const [, params] = queryKey;
  const queryParams = {
    page: params.page,
    limit: params.limit,
    sortField: params.sortField,
    sortOrder: params.sortOrder,
  };

  if (params.search) {
    queryParams.search = params.search;
  }
  if (params.bloodGroup) {
    queryParams.Blood_Group = params.bloodGroup;
  }

  const { data } = await axios.get(API_ENDPOINTS.BLOOD_GROUP, {
    params: queryParams,
  });
  return data;
};

