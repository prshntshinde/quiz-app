export interface IActionResult {
  message: string;
}

export interface IFormData {
  get(name: string): FormDataEntryValue | null;
}

export interface IServerActionError {
  message: string;
}

export type ServerActionResponse<T = IActionResult> =
  | T
  | { error: string }
  | never;