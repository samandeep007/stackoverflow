import {NextRequest, NextResponse} from 'next/server';


export const POST = async(request: NextRequest) => {
    try {
        // Grab the data
        const {} = await request.json();
        // List document
        // 


    } catch (error: any) {
        console.error("Failed to vote", error);
        return NextResponse.json(
            {
                success: false,
                message: error?.message || "Failed to vote"
            },
            {
                status: error?.status || error?.code || 500
            }
        )
    }
}