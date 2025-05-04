

/**
 * Validates input data for controller methods
 */
export const validateInput = (input: Partial<{
  name: string;
  email: string;
  mobile: number;
  password: string;
  reffered_Code?: string;
  otp: string;
  token: string;
  userImage?: string | null;
}>): void => {
  if (input.name !== undefined && (typeof input.name !== 'string' || input.name.trim() === '')) {
    throw new Error('Invalid name');
  }
  if (input.email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    throw new Error('Invalid email format');
  }
  if (input.mobile !== undefined && input.mobile.toString().length !== 10) {
    throw new Error('Invalid mobile number');
  }  
  if (input.password !== undefined && (typeof input.password !== 'string' || input.password.length < 6)) {
    throw new Error('Password must be at least 6 characters');
  }
  if (input.reffered_Code !== undefined && (typeof input.reffered_Code !== 'string' || input.reffered_Code.trim() === '')) {
    throw new Error('Invalid referral code');
  }
  if (input.otp !== undefined && (typeof input.otp !== 'string' || input.otp.trim() === '')) {
    throw new Error('Invalid OTP');
  }
  if (input.token !== undefined && (typeof input.token !== 'string' || input.token.trim() === '')) {
    throw new Error('Invalid token');
  }
  if (input.userImage !== undefined && input.userImage !== null && typeof input.userImage !== 'string') {
    throw new Error('Invalid user image');
  }
};
