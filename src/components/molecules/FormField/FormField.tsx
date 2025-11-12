import { InputHTMLAttributes } from 'react';
import Input from '@/components/atoms/Input';
import Label from '@/components/atoms/Label';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export default function FormField({
  label,
  error,
  helperText,
  ...props
}: FormFieldProps) {
  return (
    <div className="form-field">
      <Label required={props.required}>{label}</Label>
      <Input error={error} {...props} />
      {helperText && <span className="helper-text">{helperText}</span>}
    </div>
  );
}
