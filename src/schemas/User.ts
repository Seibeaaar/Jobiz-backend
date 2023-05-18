import * as yup from "yup";
import {constructRegex, nameRegex} from "../utils/regex";

import {
  jobType,
  jobCategory,
  locationType,
  employerType,
} from "../constants/user";

const AuthCredentials = {
  email: yup.string().required("Email required").email(),
  firstName: yup
    .string()
    .required("First name required")
    .matches(nameRegex, "Invalid first name"),
  lastName: yup
    .string()
    .required("Last name required")
    .matches(nameRegex, "Invalid last name"),
  id: yup.string().required("Id of the user required"),
};

export const EmployeeSchema = yup.object({
  ...AuthCredentials,
  locationPreference: yup
    .string()
    .required("Location preference required")
    .matches(constructRegex(locationType), "Invalid location preference"),
  jobType: yup
    .array()
    .of(yup.string().matches(constructRegex(jobType)))
    .required(),
  jobCategory: yup
    .array()
    .of(yup.string().matches(constructRegex(jobCategory)))
    .required(),
});

export const EmployerSchema = yup.object({
  ...AuthCredentials,
  type: yup
    .string()
    .required("Employer type required")
    .matches(constructRegex(employerType), "Invalid employer type"),
  company: yup.string(),
  position: yup.string(),
});
