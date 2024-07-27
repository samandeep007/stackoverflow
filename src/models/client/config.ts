import { Client, Account, Avatars, Databases, Storage } from "appwrite";
import env from "@/app/env";


const client = new Client()
    .setEndpoint(env.appwrite.endpoint) 
    .setProject(env.appwrite.projectId); 

const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);
const storage = new Storage(client);

export {client, databases, avatars, account, storage};

