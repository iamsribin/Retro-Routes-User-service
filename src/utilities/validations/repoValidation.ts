import mongoose from "mongoose";

/**
 * Validates input data for repository methods
 */
export const validateInput = (input: Partial<{
  id?: string;
  mobile?: number;
  email?: string;
  status?: string;
  reason?: string;
  name?: string;
  password?: string;
  referral_code?: string;
  userImage?: string | null;
}>): void => {
  if (input.id !== undefined && !mongoose.Types.ObjectId.isValid(input.id)) {
    throw new Error('Invalid user ID');
  }
  if (input.mobile &&  input.mobile.toString().length !== 10) {
    console.log("iouu");
    
    throw new Error("Invalid mobile number");
  }
  
  if (input.email !== undefined && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    throw new Error('Invalid email format');
  }
  if (input.status !== undefined && !['Good', 'Block'].includes(input.status)) {
    throw new Error('Invalid status: must be "Good" or "Block"');
  }
  if (input.reason !== undefined && (typeof input.reason !== 'string' || input.reason.trim() === '')) {
    throw new Error('Invalid reason');
  }
  if (input.name !== undefined && (typeof input.name !== 'string' || input.name.trim() === '')) {
    throw new Error('Invalid name');
  }
  if (input.password !== undefined && (typeof input.password !== 'string' || input.password.length < 6)) {
    throw new Error('Password must be at least 6 characters');
  }
  if (input.referral_code !== undefined && (typeof input.referral_code !== 'string' || input.referral_code.trim() === '')) {
    throw new Error('Invalid referral code');
  }
  if (input.userImage !== undefined && input.userImage !== null && typeof input.userImage !== 'string') {
    throw new Error('Invalid user image');
  }
};
