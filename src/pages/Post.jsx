import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import storageService from "../appwrite/storage";
import { Button } from "../components";
import parse from "html-react-parser"

export default function Post() {
    const [post, setPost] = useState([])
    const { slug } = useParams()
    const navigate = useNavigate()

    const userData = useSelector(state => state.auth.userData)

    const isAuthor = post && userData ? post.userId === userData.$id : false

    useEffect(() => {
        if (slug) {
            storageService.getPost(slug)
                .then((post) => {
                    if (post) {
                        setPost(post)
                    } else {
                        navigate("/")
                    }
                })
        } else {
            navigate("/")
        }
    }, [])

    async function deletePost() {
        storageService.deletePost()
            .then((status) => {
                if (status) {
                    storageService.deleteFile(post.featuredImage)
                    navigate("/")
                }
            })
    }

    return (
        <>
            {post &&
                <div>
                    <Container>
                        <img
                            src={storageService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                        />

                        {isAuthor && (
                            <div>
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button children="Edit" />
                                </Link>
                                <Button children="Delete" onClick={deletePost} />
                            </div>
                        )}

                        <div>
                            <h1>{post.title}</h1>
                        </div>
                        <div>
                            {parse(post.content)}
                        </div>
                    </Container>
                </div>
            }
        </>
    )


}