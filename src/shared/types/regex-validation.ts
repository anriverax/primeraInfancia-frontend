/**
 * Regular expressions for common validation patterns.
 */
interface ValidationRegex {
  /**
   * Regular expression for validating email addresses.
   */
  email: RegExp;

  /**
   * Regular expression for validating strong passwords.
   * Passwords must contain at least one lowercase letter, one uppercase letter,
   * one digit, and be at least 8 characters long.
   */
  password: RegExp;

  /**
   * Regular expression for validating phone.
   */
  phone: RegExp;

  /**
   * Regular expression for validating dui.
   */
  dui: RegExp;
}

/**
 * Object containing various regular expressions for validation.
 */
export const regex: ValidationRegex = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&.]{8,}$/,
  phone: /^(2|6|7)\d{3}-\d{4}$/,
  dui: /^\d{8}-\d{1}$/
};
