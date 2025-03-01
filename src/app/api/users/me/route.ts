import { getDataFromToken } from "@/helpers/get_data_from_token";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/dbConfig/dbConfig";

connect();

export async function GET(req: NextRequest) {
    try {
        const userId = await getDataFromToken(req);
        const user = await User.findOne({_id:userId}).select('-password');
        return NextResponse.json({
            message: "User data fetched successfully",
            data: user
        });} catch (error: any) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
        
    }
}

