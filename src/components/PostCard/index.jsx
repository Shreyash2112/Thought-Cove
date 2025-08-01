import { Link } from "react-router-dom"
import storageService from "../../appwrite/storage"

function PostCard({ featuredImage, title, $id }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className="w-full bg-header/30 rounded-xl p-4">
                <div className="w-full justify-center mb-4">
                    <img
                        src={storageService.getFilePreview(featuredImage)}
                        alt={title}
                        className="rounded-xl"
                    />
                </div>
                <h2 className="font-bold text-xl">{title}</h2>
            </div>
        </Link>
    )
}

export default PostCard