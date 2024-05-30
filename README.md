# Day by Day progress of buildin Blog App using React

## Our mega project in React | The hard way

* Project Introduction
    - Basic Blog website with login and signup fuctionalities.
---

## Appwrite backend for react project

In mega project we are going to create a full-fledge working Application. But the problem is that, React is a frontend library and we cannot handle backend from it. So for the implementation of Backend we will ues some services like Appwrite. 

And we will also use some more opensource libraries like TinyMCE, html-react-parser, React Hook Form etc.

* **Appwrite**
    - Appwrite is a Backend as a service.
    - Appwrite is a servise proider which provides the backend servise for your Application.
---

## ENV and Appwrite in React project

* Created a new react app using vite

* Download all the required dependencies by using follownig command:
``` javascript
 npm i @reduxjs/toolkit react-redux react-router-dom appwrite @tinymce/tinymce-react html-react-parser react-hook-form
```
* **Environment Variables**
    - Why?
        - As we all know that react is a frontend library and everything we write in react it sheeped to Javascript in Browser. To access the database we use some id and password which we don't want to be shared so to protect these secret info we use Environment Variables.
    
    - Always create environment variables into the root of your project.

    - Creating and Accessing environtment variable
        - If you are creating react application using 'create react app' then you have to save the variable with having name like 'REACT_APP_NOT_SECRET_CODE' and it will be accesed by using 'process.env.REACT_APP_NOT_SECRET_CODE'.
        - If you are creating react application using 'create vite@lates' then you have to save the variable with having name like 'VITE_SECRET_CODE' and it will be accesed by using 'import.meta.env.VITE_SECRET_CODE'.
---

## Build authentication service with appwrite

* Build authentication service for appwrite

* Built Client, Account and services: 

``` javascript

import conf from '../conf.js'
import { Client, Account, ID} from "appwrite";

export class AuthSevise {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectd);
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique() ,email, password, name);
            if(userAccount) {
                // call another method
                return this.login({email, password});
            } 
            else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        
        return null;
    }
    
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new AuthSevise();

export default authService;

```
---

## Appwrite database, file upload and custom queries

* Creating services for appwrite database:

```javascript
import conf from '../conf.js'
import { Client, Databases, ID, Storage, Query} from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectd);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deleteDocument(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
            return false;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            );
        } catch (error) {
            console.log("Appwrite service :: getPosts :: error", error);
            return false;
        }
    }

    //file upload services
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        );
    }
}

const service = new Service();

export default service

```
---

## How to configure redux toolkit in big projects

* Creat Store and Slice for authentication.

* Create Header and Footer Components 
---

## Production grade react components

* Production Grade Header and Footer

* Production Grade Buttons, Inputs Designed (Common Button, Input filed)

* forwardRef hook of react is used, when we have created components for input field and using it for login page, then we need the access of states in login page also then we use this forward hook of react.
---

## How to use React hook form in production

* Made Select component with using forwardRef hook for the references of States.

* Create PostCard component for the Posts in Application.

* Created Login Form.

* Created Signup Form.

* Created a Auth Layout. It is a mechanist that describes how can we protect pages and routes.

* Resource for rejex: https://regexr.com/

## Adding form and slug values

* Created a RTE component using react-hook-form

* Created a PostForm component. and Handling slugs.

## Building pages | chai aur react

* Create pages like AddPost, Addposts, Login, Signup etc..

* Routing

## CORS and debugging in React Project

* Debugging the project