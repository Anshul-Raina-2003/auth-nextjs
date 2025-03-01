import connect from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import {sendMail} from '@/helpers/mailer';

connect();

// Change from 'export default' to 'export async function POST'
export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { username, email, password } = reqBody;
        
        const user = await User.findOne({ email: email });
        if (user) {
            return NextResponse.json(
                { error: 'User already exists' },
                { status: 400 }
            );
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        const savedUser = await newUser.save();
        await sendMail({email: savedUser.email, emailType: 'VERIFY', userId: savedUser._id});

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}