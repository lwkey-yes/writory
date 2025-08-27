import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import RefreshToken from '../models/RefreshToken.js';

export const generateTokens = async (userId) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m' }
  );

  const refreshTokenValue = crypto.randomBytes(64).toString('hex');
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

  const refreshToken = new RefreshToken({
    token: refreshTokenValue,
    userId,
    expiresAt,
  });

  await refreshToken.save();

  return {
    accessToken,
    refreshToken: refreshTokenValue,
  };
};

export const verifyRefreshToken = async (token) => {
  const refreshToken = await RefreshToken.findOne({
    token,
    isRevoked: false,
    expiresAt: { $gt: new Date() },
  }).populate('userId');

  if (!refreshToken) {
    throw new Error('Invalid or expired refresh token');
  }

  return refreshToken;
};

export const revokeRefreshToken = async (token) => {
  await RefreshToken.updateOne(
    { token },
    { isRevoked: true }
  );
};

export const revokeAllUserTokens = async (userId) => {
  await RefreshToken.updateMany(
    { userId, isRevoked: false },
    { isRevoked: true }
  );
};