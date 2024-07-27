import { Permission } from 'node-appwrite';
import {db, commentCollection, answerCollection} from '../name';
import { databases } from './config';

export async function createCommentCollection(){
    await databases.createCollection(db, commentCollection, commentCollection, [
        Permission.read('any'),
        Permission.create('users'),
        Permission.read('users'),
        Permission.update('users'),
        Permission.delete('users')
    ])

    console.log("Comments collection created successfully");

    //creating answer attributes
    await Promise.all([
        // databases.createEnumAttribute(db, commentCollection, )
        databases.createStringAttribute(db, commentCollection, "content", 1000, true),
        databases.createStringAttribute(db, commentCollection, "typeId", 50, true),
        databases.createStringAttribute(db, commentCollection, "authorId", 50, true)
    ])

    console.log("Comment attributes created successfully");
}