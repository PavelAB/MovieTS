import React from "react";
import { Comment } from "../../types/Comment";

// TODO Hasn't finished
const CommentCard: React.FC<{Comment: Comment}> = ({Comment: Comment}) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">{Comment.ID_User ? Comment.ID_User : 'Unknown'}</h3>
            <p className="text-gray-700 text-sm mb-2">
                Posted on {new Date(Comment.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
                {Comment.body}
            </p>
            <p className="text-gray-700 flex felx-row justify-end">
                <span>
                    <button className="">+</button>
                    <button className="">-</button>
                </span>
            </p>
        </div>
    )
}

export default CommentCard