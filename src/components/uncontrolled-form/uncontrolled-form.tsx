import { useRef, useState, type FormEvent } from 'react';
import { ValidationError } from 'yup';

import { formSchemaUncontrolled, getPasswordStrength } from '@/schema';
import type { FormValue } from '@/types';
import { useFormStore } from '@/store';
import { convertImageToBase64 } from '@/utils';

export function UncontrolledForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { countries, addFormValue, closeDialog } = useFormStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData.entries());

    try {
      await formSchemaUncontrolled.validate(data, { abortEarly: false });
      const base64 = await convertImageToBase64(data.picture as File);
      addFormValue({ ...(data as unknown as FormValue), picture: base64 });
      closeDialog();
    } catch (err) {
      const validationErrors: Record<string, string> = {};
      if (err instanceof ValidationError) {
        err.inner?.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
      }
      setErrors(validationErrors);
    }
  };

  const passwordStrength = getPasswordStrength(password.current?.value || '');

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <label>
        Name
        <input name="name" aria-invalid={!!errors.name} autoComplete="on" />
        <small>{errors.name}</small>
      </label>

      <label>
        Age
        <input type="number" name="age" aria-invalid={!!errors.age} />
        <small>{errors.age}</small>
      </label>

      <label>
        Email
        <input type="email" name="email" aria-invalid={!!errors.email} autoComplete="on" />
        <small>{errors.email}</small>
      </label>

      <label>
        Password
        <input type="password" name="password" aria-invalid={!!errors.password} ref={password} />
        <small>{errors.password}</small>
        {password && <meter max={5} value={passwordStrength}></meter>}
      </label>

      <label>
        Confirm Password
        <input type="password" name="confirmPassword" aria-invalid={!!errors.confirmPassword} />
        <small>{errors.confirmPassword}</small>
      </label>

      <fieldset>
        <legend>Gender</legend>
        <input type="radio" id="male" name="gender" value="male" aria-invalid={!!errors.gender} />
        <label htmlFor="male">Male</label>
        <input type="radio" id="female" name="gender" value="female" aria-invalid={!!errors.gender} />
        <label htmlFor="female">Female</label>
        <input type="radio" id="other" name="gender" value="other" aria-invalid={!!errors.gender} />
        <label htmlFor="other">Other</label>
        <small className="error">{errors.gender}</small>
      </fieldset>

      <label>
        <input type="checkbox" value="on" name="acceptTerms" aria-invalid={!!errors.acceptTerms} />I accept the Terms
        and Conditions
        <small className="error">{errors.acceptTerms}</small>
      </label>

      <label>
        Picture
        <input type="file" name="picture" accept=".png,.jpeg,.jpg" aria-invalid={!!errors.picture} />
        <small>{errors.picture}</small>
      </label>

      <label>
        Country
        <input
          name="country"
          list="countries"
          placeholder="Select or type country"
          autoComplete="off"
          aria-invalid={!!errors.country}
        />
        <small>{errors.country}</small>
        <datalist id="countries">
          {countries.map((country) => (
            <option key={country} value={country} />
          ))}
        </datalist>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}
