import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { formSchema, type FormData, getPasswordStrength } from '@/schema';
import { countries } from '@/consts';

export function ControlledForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(formSchema),
  });

  const password = watch('password', '');
  const passwordStrength = getPasswordStrength(password);

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
        <input type="checkbox" {...register('acceptTerms')} aria-invalid={!!errors.acceptTerms} />I accept the Terms and
        Conditions
        <small className="error">{errors.acceptTerms?.message}</small>
      </label>

      <label>
        Picture
        <input type="file" accept=".png,.jpeg,.jpg" {...register('picture')} aria-invalid={!!errors.picture} />
        <small>{errors.picture?.message}</small>
      </label>

      <label htmlFor="country">Country</label>
      <select aria-label="Select country" autoComplete="on" {...register('country')} aria-invalid={!!errors.country}>
        <option selected disabled value="">
          Select country
        </option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </select>
      <small>{errors.country?.message}</small>

      <button type="submit">Submit</button>
    </form>
  );
}
