export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Points to the local email+password login page (replaces Manus OAuth portal)
export const getLoginUrl = (returnPath?: string) => {
  const path = returnPath ? `/login?return=${encodeURIComponent(returnPath)}` : "/login";
  return path;
};
