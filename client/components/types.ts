export interface DoctorProps {
  _id: string;
  username: string;
  role: string;
  hospital: string;
}

export interface HospitalProps {
  _id: string;
  name: string;
  email: string;
  phone: string;
  doctors: DoctorProps[];
}

export interface UserProps {
  _id: string;
  name: string;
  email: string;
  phone: string;
}
