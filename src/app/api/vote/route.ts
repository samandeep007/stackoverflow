import { answerCollection, db, questionCollection, voteCollection } from '@/models/name';
import { databases, users } from '@/models/server/config';
import { NextRequest, NextResponse } from 'next/server';
import { ID, Query } from 'node-appwrite';
import { IUserPrefs } from '@/store/Auth';


export const POST = async (request: NextRequest) => {
    try {
        // Grab the data
        const { votedById, voteStatus, typeId, type } = await request.json();

        //validate the fields
        if (!votedById || !voteStatus || !typeId || !type) {
            return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
        }

        // List document
        const response = await databases.listDocuments(db, voteCollection, [
            Query.equal("type", type),
            Query.equal("typeId", typeId),
            Query.equal("votedById", votedById)
        ]);


        //
        if (response.documents.length > 0) {
            await databases.deleteDocument(db, voteCollection, response.documents[0].$id);

            //decrease the reputation
            const questionOrAnswer = await databases.getDocument(db, type === "question" ? questionCollection : answerCollection, typeId);
            const prefs = await users.getPrefs<IUserPrefs>(questionOrAnswer.authorId);
            await users.updatePrefs<IUserPrefs>(questionOrAnswer.authorId, {
                reputation: response.documents[0].voteStatus === "upvoted" ? Number(prefs.reputation) - 1 : Number(prefs.reputation) + 1
            })

            //TODO: come back here

        }

        // that means previous vote doesn't exist or vote status changed
        if (response.documents[0].voteStatus !== voteStatus) {
            // 
            const doc = await databases.createDocument(db, voteCollection, ID.unique(), {
                type: type,
                typeId: typeId,
                votedById: votedById,
                voteStatus: voteStatus
            })

            //Increase/Decrease the reputation

            //
            // const questionOrAnswer = await databases.getDocument(db, type === "question" ? questionCollection : answerCollection, typeId);
            // const prefs = await users.getPrefs<IUserPrefs>(questionOrAnswer.authorId);
            

            
            // await users.updatePrefs<IUserPrefs>(questionOrAnswer.authorId, {
            //     reputation: voteStatus === "upvoted" ? Number(prefs.reputation) + 1 : Number(prefs.reputation) - 1
            // })
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
        }, { status: 200 })


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