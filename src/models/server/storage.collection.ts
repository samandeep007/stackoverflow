import { Permission } from 'node-appwrite';
import {questionAttachmentBucket} from '../name';
import { storage } from './config';

export default async function getOrCreateStorage(){
   try {
    await storage.getBucket(questionAttachmentBucket);
    console.log("Storage Bucket connected");
    
   } catch (error) {

   try {
     await storage.createBucket(questionAttachmentBucket, questionAttachmentBucket, [
         Permission.create('users'),
         Permission.read('any'),
         Permission.read('users'),
         Permission.update('users'),
         Permission.delete('users')
     ], false, undefined, undefined, ["jpg", "jpeg", "png", "heic", "gif", "webp"]);
     
     console.log("Question attachment bucket created successfully");

   } catch (error) {
    console.error("Error creating question attachment bucket", error);
   }

   }

    
}