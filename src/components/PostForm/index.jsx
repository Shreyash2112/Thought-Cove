import { Form, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import storageService from "../../appwrite/storage"
import { useCallback, useEffect } from "react"
import { Input, RTEditor, Button, SelectBtn } from "../index"

export default function PostForm({ post }) {

    const { register, handleSubmit, watch, control, setValue, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    async function submit(data) {
        if (post) {
            const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null

            if (file) {
                storageService.deleteFile(post.featuredImage)
            }

            const dbPost = await storageService.updatePost(post.slug, {
                ...data,
                featuredImage: file ? file.$id : undefined
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = data.image[0] ? await storageService.uploadFile(data.image[0]) : null

            if (file) {
                const fileId = file.$id
                data.featuredImage = fileId
                const dbPost = await storageService.createPost({
                    ...data,
                    userId: userData.$id
                })

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string") {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");
        }
        return ""
    }, [])

    useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), {
                    shouldValidate: true
                })
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title: "
                    placeholder="Enter title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug: "
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true })
                    }}
                />
                <RTEditor label="Content:" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={storageService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}

                <SelectBtn
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                    children={post ? "Update" : "Submit"}
                />
            </div>
        </form>
    )
}