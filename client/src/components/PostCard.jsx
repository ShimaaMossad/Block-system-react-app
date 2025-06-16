export default function PostCard({ post, canEdit, onDelete, onEdit }) {
  return (
    <div className="justify-items-center w-full bg-base-100 shadow p-4 rounded mb-4">
      <img src={post.image} alt={post.title} className="w-200 h-100 rounded mb-2" />
      <h2 className="text-lg font-bold">{post.title}</h2>
      <p>{post.body}</p>
      <p className="text-sm text-gray-600">By: {post.author}</p>
      {canEdit && (
        <div className="mt-2 flex gap-2">
          <button onClick={() => onEdit(post)} className="btn btn-info">Edit</button>
          <button onClick={() => onDelete(post._id)} className="btn btn-error">Delete</button>
        </div>
      )}
    </div>
  )
}