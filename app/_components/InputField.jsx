"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const InputField = ({
  id,
  label,
  type,
  register,
  error,
  placeholder,
  disabled,
}) => {
  return (
    <div className="grid gap-1">
      <Label htmlFor={id} className="mb-1">
        {label}
      </Label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register}
        disabled={disabled}
      />
      {error && <p className="text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default InputField;
