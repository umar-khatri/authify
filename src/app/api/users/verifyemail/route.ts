import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

export async function POST(request: NextRequest) {
  try {
    await connect();
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    // Find user with the token and check expiration
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }
    console.log(user);

    // Update user verification status
    user.isVerified = true;
    user.verifyToken = undefined; // Remove the token
    user.verifyTokenExpiry = undefined; // Remove expiry
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      toastMessage: "Your email has been verified successfully!",
      toastType: "success",
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
