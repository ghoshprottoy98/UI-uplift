import {camelCaseToHumanText} from "@bracit/common-utils";

export class AppModuleRegistry {

  static readonly modules: Map<string, string> = new Map([
    ['student', 'Student'],
    ['applicant', 'Applicant'],
    ['admission', 'Admission'],
    ['config', 'Configuration'],
    ['app', 'My Desk'],
    ['rpt', 'Report']
  ]);

  static getOptions(): { value: string, label: string }[] {
    return Array.from(AppModuleRegistry.modules).map(([value, label]) => {
      return {value, label}
    })
  }

  static getLabelByKey(key: string) {
    return AppModuleRegistry.modules.get(key) || camelCaseToHumanText(key) || ''
  }
}
