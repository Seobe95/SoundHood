import { useEffect, useState } from 'react';

interface UseFormProps<T> {
  initialValue: T;
  validate: (values: T) => Record<keyof T, string>;
}
/**
 * Form에 사용되는 hook입니다.
 * @param initailValue
 * @returns
 */
export function useForm<T>({ initialValue, validate }: UseFormProps<T>) {
  const [values, setValues] = useState(initialValue);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleChangeText = (name: keyof T, text: string) => {
    setValues({
      ...values,
      [name]: text,
    });
  };

  const handleBlur = (name: keyof T) => {
    setTouched({
      ...touched,
      [name]: true,
    });
  };

  const getTextInputProps = (name: keyof T) => {
    const value = values[name];
    const onChangeText = (text: string) => handleChangeText(name, text);
    const onBlur = () => handleBlur(name);

    return {
      value,
      onChangeText,
      onBlur,
    };
  };

  const updateButtonState = (error: Record<string, string>) => {
    return Object.values(error).every(value => value === '');
  };

  useEffect(() => {
    const newErrors = validate(values);
    setErrors(newErrors);
    setIsValid(updateButtonState(newErrors));
  }, [validate, values]);

  return { values, touched, errors, isValid, getTextInputProps };
}
