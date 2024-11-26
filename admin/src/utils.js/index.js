import moment from "moment";

export const formatDate = (date) => {
  const formattedDate = moment(date).fromNow();
  return formattedDate;
};
