import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { formSchema, type FormData, getPasswordStrength } from '@/schema';

export function ControlledForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
  });

  const password = watch('password', '');
  const passwordStrength = getPasswordStrength(password);
  const passwordLabel = ['weak', 'fair', 'good', 'strong'][passwordStrength - 1];

  const onSubmit = (data: FormData) => {
    console.log('Form data:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name
        <input {...register('name')} aria-invalid={!!errors.name} />
        <small>{errors.name?.message}</small>
      </label>

      <label>
        Age
        <input type="number" {...register('age', { valueAsNumber: true })} aria-invalid={!!errors.age} />
        <small>{errors.age?.message}</small>
      </label>

      <label>
        Email
        <input type="email" {...register('email')} aria-invalid={!!errors.email} />
        <small>{errors.email?.message}</small>
      </label>

      <label>
        Password
        <input type="password" {...register('password')} aria-invalid={!!errors.password} />
        <small>{errors.password?.message}</small>
        {password && (
          <small className={`strength-${passwordLabel}`}>
            Strength: {passwordStrength}/4 - {passwordLabel || 'very weak'}
          </small>
        )}
      </label>

      <label>
        Confirm Password
        <input type="password" {...register('confirmPassword')} aria-invalid={!!errors.confirmPassword} />
        <small className="error">{errors.confirmPassword?.message}</small>
      </label>

      <fieldset>
        <legend>Gender</legend>
        <input type="radio" id="male" value="male" {...register('gender')} aria-invalid={!!errors.gender} />
        <label htmlFor="male">Male</label>
        <input type="radio" id="female" value="female" {...register('gender')} aria-invalid={!!errors.gender} />
        <label htmlFor="female">Female</label>
        <input type="radio" id="other" value="other" {...register('gender')} aria-invalid={!!errors.gender} />
        <label htmlFor="other">Other</label>
      </fieldset>
      <small>{errors.gender?.message}</small>

      <label>
        <input type="checkbox" {...register('acceptTerms')} aria-invalid={!!errors.acceptTerms} />I accept the Terms and
        Conditions
      </label>
      <small>{errors.acceptTerms?.message}</small>

      <label>
        Picture
        <input type="file" accept=".png,.jpeg,.jpg" {...register('picture')} aria-invalid={!!errors.picture} />
        <small className="error">{errors.picture?.message}</small>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
