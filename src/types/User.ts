export type UserRole = "employee" | "employer";
export type EmployerType = "private" | "company";

export type Location = "offline" | "online";
export type JobType =
  | "frelance"
  | "internship"
  | "contract"
  | "fullTime"
  | "partTime";

export type JobCategory =
  | "design"
  | "software"
  | "marketing"
  | "copywriting"
  | "management"
  | "others";

export interface BasicUser {
  email: string;
  createdAt: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}

export interface Employer extends BasicUser {
  company?: string;
  position?: string;
  type: EmployerType;
}

export interface Employee extends BasicUser {
  jobType: JobType;
  jobCategory: JobCategory;
  locationPreference: Location;
}

export interface EmployeeData extends Employee {
  id: string;
}

export interface EmployerData extends Employer {
  id: string;
}
