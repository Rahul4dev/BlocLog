import { connect } from '@/dbConfig/dbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token or token expired or User do not exist' },
        { status: 401 }
      );
    }

    console.log(user);
    user.isVerified = true;
    (user.verifyToken = undefined), (user.verifyTokenExpiration = undefined);

    await user.save();

    return NextResponse.json({
      message: 'User email verified successfully',
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
