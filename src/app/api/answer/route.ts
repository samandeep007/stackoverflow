import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
    try {

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error?.message || "Error creating answer" }, { status: error?.status || error?.code || 500 });
    }
}