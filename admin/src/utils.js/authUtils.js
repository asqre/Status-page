export const getUserData = () => {
  // Memoize to prevent multiple session storage reads
  const cachedUser = getUserData.user;
  const cachedOrganization = getUserData.organization;

  if (cachedUser && cachedOrganization) {
    return { user: cachedUser, organization: cachedOrganization };
  }

  const user = JSON.parse(sessionStorage.getItem("user"));
  const organization = JSON.parse(sessionStorage.getItem("organization"));

  // Cache the values
  getUserData.user = user;
  getUserData.organization = organization;

  return { user, organization };
};
