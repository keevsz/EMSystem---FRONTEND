import { ITuition } from "@/types/tuition"

// const BACKEND_URL =
//   'http://localhost:3001' ||
//   process.env.API_URL ||
//   'https://emsystem.onrender.com'
const BACKEND_URL = process.env.API_URL || 'https://emsystem2.onrender.com'

export interface ITuitionRequest {
  parentName:        string;
  parentLastname:    string;
  parentDni:         string;
  parentEmail:       string;
  parentPhoneNumber: string;
  studentName:       string;
  studentLastname:   string;
  studentDni:        string;
  studentBirthdate:  string;
  studentAddress:    string;
  studentGender:     string;
  schoolYear:        string;
  degree:            string;
}

export async function fetchCreateTuitionAdmin(
    accessToken: string,
    tuitionData: ITuitionRequest
  ) {
    const res = await fetch(`${BACKEND_URL}/tuitions/admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(tuitionData),
    })
    const data = await res.json()
    if (
      data.statusCode === 403 ||
      data.statusCode === 401 ||
      data.statusCode === 400 ||
      data.statusCode === 500 
    ) {
      throw new Error(data.message)
    }
    console.log(data);
    return data
  }