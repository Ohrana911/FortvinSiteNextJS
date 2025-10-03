'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '../../ui/input';
import { ClearButton, ErrorText, RequiredSymbol } from '..';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<Props> = ({ className, name, label, required, ...props }) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  const onClickClear = () => {
    setValue(name, '', { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-[18px] mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <input
          {...register(name)}
          {...props}
          className="
            w-full
            px-3 py-3
            text-[20px]
            border border-[#2F3336]
            bg-[var(--color-light-gray)]
            mb-5
            transition-colors duration-200 ease-in-out
            focus:outline-none focus:bg-[#BCDBF2]
            valid:bg-[#BCDBF2]
          "
        />

        {/* {value && <ClearButton onClick={onClickClear} />} */}
      </div>

      {errorText && <ErrorText text={errorText} className='mb-4 mt-[-14px]'/>}
    </div>
  );
};
