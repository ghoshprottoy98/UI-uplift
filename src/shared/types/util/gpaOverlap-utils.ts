export function checkForGpaOverlap(formData: any, existingData: any[]): boolean {
  return existingData.some(data => {
    let gpa = Number(data.gpa);
    let formGpa = Number(formData.gpa);
    let checkGpa = false;
    if(gpa != 4) {
      checkGpa = gpa == formGpa;
    }
    return checkGpa;
  });
}
