export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return dateString.toLocaleDateString("en-IN", options);
};
