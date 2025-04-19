import { getTokenData } from "@/helpers/getTokenData";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

export async function GET(request: NextRequest) {
  try {
    await connect();

    const userId = await getTokenData(request);
    const user = await User.findOne({ _id: userId }).select("-password");

    return NextResponse.json(
      { message: "User found", data: user },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "An unknown error occurred" }, { status: 400 });
  }
}
