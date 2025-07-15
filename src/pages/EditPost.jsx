import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import storageService from "../appwrite/storage";
import { Container, PostForm } from "../components";

export default function EditPost() {
    const [post, setPost] = useState([])
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            storageService.getPost(slug)
                .then((post) => setPost(post))
        }
        else (
            navigate("/")
        )
    }, [slug, navigate])

    return (
        <>
            {post &&
                <div className='py-8'>
                    <Container>
                        <PostForm post={post} />
                    </Container>
                </div>}
        </>
    )

}