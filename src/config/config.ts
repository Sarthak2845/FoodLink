const config={
        appwriteUrl:String(import.meta.env.VITE_APPWRITE_ENDPOINT),
        appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
        appwriteDatabaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
}
export default config
