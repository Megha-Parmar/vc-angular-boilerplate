export interface ActionToolbar {
  label: string;
  callback: (rowReference: any) => void;
}