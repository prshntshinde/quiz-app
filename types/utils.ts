export type ClassValue = string | number | boolean | undefined | null | ClassValue[] | Record<string, boolean | undefined | null>;

export interface ITwMerge {
  (...inputs: ClassValue[]): string;
}

export interface ISanitizeData {
  <T>(obj: T): T;
}