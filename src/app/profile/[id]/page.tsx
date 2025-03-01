export default async function UserProfile({params}: any) {
    return (
        <div>
            <h1>User Profile - {(await params).id}</h1>   
        </div>
    )}
