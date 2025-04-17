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
      { mesage: "user found", data: user },
      { status: 200 } 
    );
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
