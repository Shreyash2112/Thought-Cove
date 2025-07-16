import { useEffect, useState } from "react"
import { Container, PostCard } from "../components"
import storageService from "../appwrite/storage"

function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        storageService.getAllPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
            .catch((e) => console.error(e))
    }, [])

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts?.map((post) => {
                        return (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post} />
                            </div>
                        )
                    })}
                </div>
            </Container>
        </div>
    )

}
export default AllPosts