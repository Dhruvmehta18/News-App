export const DEFAULT_QUERY = "";

const PATH_BASE = "https://hn.algolia.com/api/v1";
const PATH_SEARCH = "/search";
const PARAM_SEARCH = "query=";
export const BASE_URL = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}`;
export const PARAM_PAGE = "page=";