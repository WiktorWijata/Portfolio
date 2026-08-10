export interface CodeEditorProps {
  fileName: string;
  code: string;
  language?: string;
  startLine?: number;
  className?: string;
}