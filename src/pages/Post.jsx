import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import storageService from "../appwrite/storage";
import { Button, Container } from "../components";
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
    }, [navigate, slug])

    function deletePost() {
        storageService.deletePost(post.$id)
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
                <div className="py-8 relative">
                    <Container>
                        <img
                            src={storageService.getFilePreview(post?.featuredImage)}
                            alt={post.title}
                            className="rounded-xl"
                        />

                        {isAuthor && (
                            <div className="absolute right-10 top-10">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button children="Edit" bgColor="bg-green-600 rounded-full cursor-pointer" className="mr-3" />
                                </Link>
                                <Button children="Delete" onClick={deletePost} bgColor="bg-red-600 rounded-full cursor-pointer" />
                            </div>
                        )}

                        <div className="w-full mb-6">
                            <h1 className="text-2xl font-bold">{post.title}</h1>
                        </div>
                        <div className="browser-css">
                            {parse(String(post.content))}
                        </div>
                    </Container>
                </div>
            }
        </>
    )


}