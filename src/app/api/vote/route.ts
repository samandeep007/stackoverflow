import { db, voteCollection } from '@/models/name';
import { databases } from '@/models/server/config';
import {NextRequest, NextResponse} from 'next/server';
import { Query } from 'node-appwrite';


export const POST = async(request: NextRequest) => {
    try {
        // Grab the data
        const {votedById, voteStatus, typeId, type} = await request.json();
        
        //validate the fields
        if(!votedById || !voteStatus || !typeId || !type){
            return NextResponse.json({success: false, message: "All fields are required"}, {status: 400});
        }

        // List document
        const response = await databases.listDocuments(db, voteCollection, [
            Query.equal("type", type), 
            Query.equal("typeId", typeId),
            Query.equal("votedById", votedById)
        ]);


        //
        if(response.documents.length > 0){
            //
        } 

        // that means previous vote doesn't exist or vote status changed
        if(response.documents[0].voteStatus !== voteStatus){

        }

        const [upvotes, downvotes] = await Promise.all([
            databases.listDocuments(db, voteCollection, [
                Query.equal("type", type),
                Query.equal("typeId", typeId),
                Query.equal("voteStatus", "upvoted"),
                Query.equal("votedById", votedById),
                Query.limit(1)
            ]),

            databases.listDocuments(db, voteCollection, [
                Query.equal("type", type),
                Query.equal("typeId", typeId),
                Query.equal("votedById", votedById),
                Query.equal("voteStatus", "downvoted"),
                Query.limit(1)
            ])
        ])

        return NextResponse.json({
            data: {
                document: null,
                voteResult: upvotes.total = downvotes.total
            },
            message: "vote handled"
        }, {status: 200})


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