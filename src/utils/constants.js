export const APIKey = "340dafab05834f4194b546b01ecf4057";

const currentDate = new Date();

export const parseCurrentDate = (date) => {
  const dateObj = new Date(date);
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const previousWeek = new Date();
previousWeek.setDate(currentDate.getDate() - 7);

export const parsePreviousWeek =
  previousWeek.getFullYear() +
  "-" +
  String(previousWeek.getMonth() + 1).padStart(2, "0") +
  "-" +
  String(previousWeek.getDate()).padStart(2, "0");
