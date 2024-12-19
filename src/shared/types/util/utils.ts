import {environment} from '../../../environments/environment';
import {FormGroup} from '@angular/forms';
import {getUrlByPreset} from "@bracit/common-utils";

const FILE_NAME_LENGTH = 20;
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

type DateFormatter = (d: Date) => string;
const isoFormatter: DateFormatter = (d: Date) => d.toISOString()

export function jsonToFormData(data: any, formData: FormData = new FormData(), parentKey?: string, dateFormatter: DateFormatter = isoFormatter): FormData {

  if (data === null || data === undefined) {
    return formData;
  }

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];

      // Construct the key based on parentKey and current key
      const finalKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value instanceof Date) {
        formData.append(finalKey, dateFormatter(value));
      } else if (typeof value === 'object' && !(value instanceof File)) {
        // Recursively handle nested objects
        jsonToFormData(value, formData, finalKey, dateFormatter);
      } else if (Array.isArray(value)) {
        // Handle array values
        value.forEach((item: any, index: number) => {
          const arrayKey = `${finalKey}[${index}]`;
          formData.append(arrayKey, item);
        });
      } else {
        // Append the key-value pair to the FormData
        formData.append(finalKey, value);
      }
    }
  }

  return formData;
}


export function formatFileName(name) {
  return name.replace(/^[^_]+_/, "");
}

export function getTrimmingOptions(name) {
  if (FILE_NAME_LENGTH >= name.length) {
    return false;
  }

  const ext = getExt(name);
  if (ext.length * 2 >= FILE_NAME_LENGTH - 4) {
    return false;
  }
  const trimOption = {
    last: 0,
    first: 0
  };
  trimOption.last = (ext.length * 2) + 1;
  trimOption.first = FILE_NAME_LENGTH - trimOption.last - 3;

  return trimOption;
}

function getExt(file) {
  return (-1 !== file.indexOf('.')) ? file.replace(/.*[.]/, '') : '';
}

type ImageFilterType = 'preview' | 'thumb' | 'big' | 'avatar';

export function getDownloadOrStreamUrl(pathType: string, fileId: any, filePath: string) {
  return `${environment.fileDownloadApiBaseUrl}${pathType}/${fileId}/${filePath}`;
}

export function getPreviewUrl(filter: ImageFilterType, filePath: string | undefined | null) {
  return `${environment.cdnBaseUrl}${getUrlByPreset(filter, filePath || '')}`;
}

export function resetFormFieldValue(formName: FormGroup, controllerName: string) {
  // @ts-ignore
  formName.get(controllerName).setValue(null);
}


export function formatNumber(num: number) {
  if (isNaN(num)) {
    return '';
  }

  return (Math.round(num * 100) / 100).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export const sizeWithUnit = (size): string => {
  const BYTES_IN_KB = 1024;

  if (size <= BYTES_IN_KB) {
    return size + 'B';
  }

  const EXP = parseInt('' + (Math.log(size) / Math.log(BYTES_IN_KB)), 10);
  const PREFIX = 'KMGTPE';

  const value = formatNumber(size / Math.pow(BYTES_IN_KB, EXP));

  return '' + value + PREFIX[EXP - 1] + 'B';
};

export const fileSizeValidationMsg = (size: any) => {
  let CommonsConstants = 'Max File Size';
  return `${CommonsConstants} ${size} Exceeded`;
};

export const homeRouteForUserType = (type: string): string => {
  switch (type) {
    case 'STUDENT':
      return 'student';
    case 'APPLICANT':
      return '/applicant/dashboard';
  }

  return '';
}

export const filterObjectByKeys = (obj: Record<string, any>, keys: string[]): Record<string, any> => {
  return keys.reduce((acc, key) => {
    if (obj.hasOwnProperty(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

export function numberCommaSeparator(value: any, hideDecimal: boolean = false, decimalCount?: number): string {
  if (value) {
    if (!hideDecimal && !Number.isInteger(value) && value != 0) {
      value = value.toFixed(decimalCount ? decimalCount : 2)
    }
    const parts = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (hideDecimal) {
      return parts[0]
    } else {
      return parts.join(".");
    }
  }
  return value;
}

export function convertEnumToObject(enumItem) {
  return Object.entries(enumItem).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {} as { [key: string]: any });

}

export function ordinalSuffix(input: number) {
  const suffixes = ['th', 'st', 'nd', 'rd'];
  const v = input % 100;
  return input + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
}

export function decodeBase64(base64String: string): string {
  // Normalize Base64 padding
  const normalizedBase64 = base64String.replace(/-/g, "+").replace(/_/g, "/");
  const paddedBase64 = normalizedBase64.padEnd(Math.ceil(normalizedBase64.length / 4) * 4, "=");

  try {
    // Decode Base64 string
    const binaryString = atob(paddedBase64);
    const binaryLength = binaryString.length;
    const bytes = new Uint8Array(binaryLength);

    // Fill Uint8Array with binary string character codes
    for (let i = 0; i < binaryLength; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    // Use TextDecoder to decode UTF-8 bytes to string
    return new TextDecoder("utf-8").decode(bytes);
  } catch (error) {
    console.error("Failed to decode Base64 string:", error);
    return "";
  }
}
