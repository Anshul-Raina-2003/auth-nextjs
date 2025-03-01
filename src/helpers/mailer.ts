import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendMail = async ({email, emailType, userId}: any) => {
    try {
        if (!email || !emailType || !userId) {
            throw new Error("Missing required parameters: email, emailType, or userId");
        }
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);
        
        if(emailType === 'VERIFY'){
            await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000},{new:true, runValidators:true});
        } else if(emailType === 'RESET'){
            await User.findByIdAndUpdate(userId, {forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000},{new:true, runValidators:true});
        }

        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS
            }
        });

        const mailOptions = {
            from: 'anshul.raina@mygate.in',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            text: `Click on the link to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'} \n
            ${process.env.DOMAIN}/${emailType.toLowerCase()}email?token=${hashedToken}`
        };

        const mailResponse = await transport.sendMail(mailOptions);
        console.log("Email sent", mailResponse.messageId);
        return mailResponse;

    } catch (error: any) {
        console.log("Error sending email", error.message);  
        
    }
}