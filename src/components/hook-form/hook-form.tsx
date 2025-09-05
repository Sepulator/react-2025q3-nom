import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { formSchemaControlled, type FormDataControlled } from '@/schema';
import { getPasswordStrength } from '@/utils';
import { useFormStore } from '@/store';
import { convertImageToBase64 } from '@/utils';

export function HookForm() {
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setFocus,
    formState: { errors, isValid },
  } = useForm<FormDataControlled>({
    resolver: yupResolver(formSchemaControlled),
    mode: 'all',
  });

  const password = watch('password', '');
  const passwordStrength = getPasswordStrength(password);
  const { countries, addFormValue, closeDialog } = useFormStore();

  useEffect(() => {
    trigger();
  }, [trigger]);

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const onSubmit = async (data: FormDataControlled) => {
    const picture = data.picture[0];
    const base64 = await convertImageToBase64(picture);
    addFormValue({ ...data, picture: base64 });
    closeDialog();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name
        <input type="text" {...register('name')} aria-invalid={!!errors.name} autoComplete="on" />
        <small>{errors.name?.message}</small>
      </label>

      <label>
        Age
        <input type="number" {...register('age', { valueAsNumber: true })} aria-invalid={!!errors.age} />
        <small>{errors.age?.message}</small>
      </label>

      <label>
        Email
        <input type="text" {...register('email')} aria-invalid={!!errors.email} autoComplete="on" />
        <small>{errors.email?.message}</small>
      </label>

      <label>
        Password
        <input type="password" {...register('password')} aria-invalid={!!errors.password} aria-label="main-password" />
        <small>{errors.password?.message}</small>
        {password && <meter max={5} value={passwordStrength}></meter>}
      </label>

      <label>
        Confirm Password
        <input type="password" {...register('confirmPassword')} aria-invalid={!!errors.confirmPassword} />
        <small>{errors.confirmPassword?.message}</small>
      </label>

      <fieldset>
        <legend>Gender</legend>
        <input type="radio" id="male" value="male" {...register('gender')} aria-invalid={!!errors.gender} />
        <label htmlFor="male">Male</label>
        <input type="radio" id="female" value="female" {...register('gender')} aria-invalid={!!errors.gender} />
        <label htmlFor="female">Female</label>
        <input type="radio" id="other" value="other" {...register('gender')} aria-invalid={!!errors.gender} />
        <label htmlFor="other">Other</label>
        <small className="error">{errors.gender?.message}</small>
      </fieldset>

      <label>
        <input type="checkbox" value="on" {...register('acceptTerms')} aria-invalid={!!errors.acceptTerms} />I accept
        the Terms and Conditions
        <small className="error">{errors.acceptTerms?.message}</small>
      </label>

      <label>
        Picture
        <input type="file" accept=".png,.jpeg,.jpg" {...register('picture')} aria-invalid={!!errors.picture} />
        <small>{errors.picture?.message}</small>
      </label>

      <label htmlFor="country">
        Country
        <input
          id="country"
          list="countries"
          placeholder="Select or type country"
          autoComplete="off"
          {...register('country')}
          aria-invalid={!!errors.country}
        />
        <small>{errors.country?.message}</small>
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </label>

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}
