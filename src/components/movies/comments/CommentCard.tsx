import React from "react";
import { Comment } from "../../../types/Comment";
import IconLikeFilled from "../../uiElements/icons/IconLikeFilled";
import IconLikeEmpty from "../../uiElements/icons/IconLikeEmpty";
import { User } from "../../../types/User";


const CommentCard: React.FC<{Comment: Comment, ID_User: number, createNewLike: (Comment: number) => void }> = ({Comment, ID_User, createNewLike}) => {

    
    const alreadyLiked: boolean = Comment.IDUsersLiked.includes(ID_User) 
    console.log("ID_User", Comment)

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">{Comment.User ? (Comment.User as User).first_name : 'Unknown'}</h3>
            <p className="text-gray-700 text-sm mb-2">
                Posted on {new Date(Comment.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700">
                {Comment.body}
            </p>
            <p className="text-gray-700 flex flex-row gap-4 justify-end">
                <span>
                    {Comment.NumberLikes}
                </span>
                <button onClick={() => createNewLike(Number(Comment.ID_Comment))}>
                    {
                        alreadyLiked ?
                            <IconLikeFilled />
                            :
                            <IconLikeEmpty />
                    }

                </button>
            </p>
        </div>
    )
}

export default CommentCard