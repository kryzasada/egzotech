import { InputType } from "@/components/ui";

export interface AuthFieldConfig {
  label: string;
  type: InputType;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onValidationChange?: (isValid: boolean) => void;
  isInvalid?: boolean;
}
export interface DataFieldConfig<T extends Record<string, string | number>> {
  label: string;
  key: keyof T;
  type: InputType;
  placeholder: string;
  isInvalid?: boolean;
  onChange?: (value: string) => void;
}
