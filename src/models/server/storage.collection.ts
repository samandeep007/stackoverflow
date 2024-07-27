import { Permission } from 'node-appwrite';
import {questionAttachmentBucket} from '../name';
import { storage } from './config';

export default async function getOrCreateStorage(){
   try {
    await storage.getBucket(questionAttachmentBucket);
    console.log("Storage Bucket connected");
    
   } catch (error) {
    await storage.createBucket(questionAttachmentBucket, questionAttachmentBucket, [
        Permission.create('users'),
        Permission.read('any'),
        Permission.read('users'),
        Permission.update('users'),
        Permission.delete('users')
    ])
    
   }

    console.log("Question attachment bucket created successfully");
}