import { Permission } from 'node-appwrite';
import {db, voteCollection} from '../name';
import { databases } from './config';

export default async function createVoteCollection(){
    await databases.createCollection(db, voteCollection, voteCollection, [
        Permission.read('any'),
        Permission.create('users'),
        Permission.read('users'),
        Permission.update('users'),
        Permission.delete('users')
    ])

    console.log("Vote collection created successfully");

    await Promise.all([
        databases.createStringAttribute(db, voteCollection, "votedById", 50, true),
        databases.createStringAttribute(db, voteCollection, "typeId", 50, true),
        // databases.createStringAttribute(db, voteCollection, )
        // databases.createEnumAttribute()
    ])

    console.log("vote attributes created successfully");
}