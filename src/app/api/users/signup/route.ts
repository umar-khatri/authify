import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log(reqBody);

    await connect();
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Generate a verification token (to be used in email verification link)
    const verifyToken = crypto.randomBytes(32).toString("hex");
    const verifyTokenExpiry = Date.now() + 3600000; // Token expiry in 1 hour

    // New user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verifyToken, // Save the token in the user's document
      verifyTokenExpiry, // Save the expiry
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    // Construct verification URL
    // Log the full URL to ensure it's correct
    const verificationUrl = `${process.env.DOMAIN}/verifyemail?token=${verifyToken}`;
    console.log("Verification URL: ", verificationUrl);

    // Send verification email
    await sendEmail(email, "VERIFY", verificationUrl);

    return NextResponse.json({
      message: "User created successfully. Please verify your email.",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
