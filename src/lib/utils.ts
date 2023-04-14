import type { ZodError, ZodType } from 'zod'

export const validateData = async <T>(
  formData: FormData,
  schema: ZodType<T>
) => {
  const body = Object.fromEntries(formData)

  try {
    const data = schema.parse(body)
    return {
      formData: data,
      errors: null
    };
  } catch (e) {
    const err = e as ZodError
    const errors = err.flatten()
    return {
      formData: body,
      errors
    };
  }
}

export const timeSince = (date: Date): string => {
  const seconds: number = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval: number = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " years";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " months";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " days";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hours";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minutes";
  }
  return Math.floor(seconds) + " seconds";
}

