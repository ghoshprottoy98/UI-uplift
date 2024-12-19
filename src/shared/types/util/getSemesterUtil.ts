import {SEMESTER_ENUM_KEY} from "../enums/enums";

export function getViewOnlySemester(id: number): { id: number, description: string } {
  const year = Math.floor(id / 10);
  const semesterCode = id % 10;

  return {
    id: id,
    description: `${semesterObj[semesterCode]} ${year}`
  };
}

const semesterObj = {
  1: SEMESTER_ENUM_KEY.SPRING,
  2: SEMESTER_ENUM_KEY.SUMMER,
  3: SEMESTER_ENUM_KEY.FALL,
}

export function getViewOnlyAllAvailableSemester(id: number, object?: any[]): any[] {
  const year = Math.floor(id / 10);
  let finalData: any[] = []

  if (object) {
    if (id === object[0].id || id < object[0].id) {
      for (let i = year; i < Math.floor(object[0].id / 10); i++) {
        for (const key in semesterObj) {
          finalData.push({id: i * 10 + parseInt(key), description: `${semesterObj[key]} ${i}`});
        }
      }
      finalData.push(...object)
    }
  } else {
    for (let i = year; i <= new Date().getFullYear(); i++) {
      for (const key in semesterObj) {
        finalData.push({id: i * 10 + parseInt(key), description: `${semesterObj[key]} ${i}`});
      }
    }
  }
  return finalData
}
