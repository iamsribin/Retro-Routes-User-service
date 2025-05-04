import mongoose from "mongoose";

export const validateInput = (input: Partial<{
  id: string;
  status: string;
  reason: string;
}>): void => {
  if (input.id !== undefined && !mongoose.Types.ObjectId.isValid(input.id)) {
    throw new Error('Invalid user ID');
  }
  if (input.status !== undefined && !['Good', 'Block'].includes(input.status)) {
    throw new Error('Invalid status: must be "Good" or "Block"');
  }
  if (input.reason !== undefined && (typeof input.reason !== 'string' || input.reason.trim() === '')) {
    throw new Error('Invalid reason');
  }
};