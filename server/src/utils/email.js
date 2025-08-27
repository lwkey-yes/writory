// Email service stub - logs to console in development
export const sendEmail = async ({ to, subject, html, text }) => {
  if (process.env.EMAIL_SERVICE === 'console' || process.env.NODE_ENV === 'development') {
    console.log('📧 Email would be sent:');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Text: ${text}`);
    console.log(`HTML: ${html}`);
    console.log('---');
    return { success: true, messageId: 'console-stub' };
  }

  // TODO: Implement actual email service (SendGrid, AWS SES, etc.)
  throw new Error('Email service not configured');
};

export const sendVerificationEmail = async (user, token) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
  
  const html = `
    <h2>Welcome to Writory!</h2>
    <p>Hi ${user.name},</p>
    <p>Please click the link below to verify your email address:</p>
    <a href="${verificationUrl}">Verify Email</a>
    <p>If you didn't create an account, please ignore this email.</p>
  `;

  const text = `
    Welcome to Writory!
    
    Hi ${user.name},
    
    Please visit the following link to verify your email address:
    ${verificationUrl}
    
    If you didn't create an account, please ignore this email.
  `;

  return sendEmail({
    to: user.email,
    subject: 'Verify your Writory account',
    html,
    text,
  });
};

export const sendPasswordResetEmail = async (user, token) => {
  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
  
  const html = `
    <h2>Password Reset Request</h2>
    <p>Hi ${user.name},</p>
    <p>You requested a password reset. Click the link below to reset your password:</p>
    <a href="${resetUrl}">Reset Password</a>
    <p>This link will expire in 1 hour.</p>
    <p>If you didn't request this, please ignore this email.</p>
  `;

  const text = `
    Password Reset Request
    
    Hi ${user.name},
    
    You requested a password reset. Visit the following link to reset your password:
    ${resetUrl}
    
    This link will expire in 1 hour.
    
    If you didn't request this, please ignore this email.
  `;

  return sendEmail({
    to: user.email,
    subject: 'Reset your Writory password',
    html,
    text,
  });
};