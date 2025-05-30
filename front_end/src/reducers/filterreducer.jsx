import { act, useReducer } from "react";
const filterReducer = (state, action) => {
  let copyArray = [...state];
  switch (action.type) {
    case "SET_STATUS":
      return copyArray.filter((job) => {
        return job.status === action.payload;
      });
    case "SET_SALARY_ASC":
      return copyArray.sort((a, b) => b.salary - a.salary);
    case "SET_SALARY_DESC":
      return copyArray.sort((a, b) => a.salary - b.salary);
    case "SET_DATE_ASC":
      return copyArray.sort((a, b) => new Date(a) - new Date(b));
    case "SET_DATE_DESC":
      return copyArray.sort((a, b) => new Date(b) - new Date(a));
    case "RESET":
      return [...action.payload]
  }
  throw Error(`Unknown Action: ${action.type}`);
};


export default filterReducer
