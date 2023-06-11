export type ResultJson = { optionValue: { [key: string]: string }; itemKey: string }

export default function isResultJson(obj: any): obj is ResultJson {
  return typeof obj.optionValue === 'object' && typeof obj.itemKey === 'string'
}
