import type { ComponentPropsWithoutRef } from 'react';

type InputProps = {
  id: string;
  label: string;
} & ComponentPropsWithoutRef<'input'>;

export default function Input({ id, label, ...props }: InputProps) {
  return (
    <div className='control'>
      <label htmlFor={id}></label>
      <input id={id} {...props} />
    </div>
  );
}
