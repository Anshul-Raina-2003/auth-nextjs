import {NextResponse} from 'next/server';

export async function GET() {
    try {
        const response = NextResponse.json({ message: "Logout successful", success: true });
        console.log("Logout successful", response);
        response.cookies.set('token', '', {httpOnly: true});
        return response;
    } catch (error: any) {
        console.log("Logout failed", error.message);
        return NextResponse.json({error: error.message}, {status: 500});
        
    }
}