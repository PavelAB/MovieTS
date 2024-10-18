import React from "react";
import { Comment } from "../../types/Comment";


const CommentCard: React.FC<{Comment: Comment, ID_User: number, createNewLike: (Comment: number) => void }> = ({Comment, ID_User, createNewLike}) => {

    
    const alreadyLiked: boolean = Comment.IDUsersLikes.includes(ID_User) 
    console.log("ID_User", ID_User, alreadyLiked)

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">{Comment.User ? Comment.User.first_name : 'Unknown'}</h3>
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

                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M15.03 9.684h3.965c.322 0 .64.08.925.232.286.153.532.374.717.645a2.109 2.109 0 0 1 .242 1.883l-2.36 7.201c-.288.814-.48 1.355-1.884 1.355-2.072 0-4.276-.677-6.157-1.256-.472-.145-.924-.284-1.348-.404h-.115V9.478a25.485 25.485 0 0 0 4.238-5.514 1.8 1.8 0 0 1 .901-.83 1.74 1.74 0 0 1 1.21-.048c.396.13.736.397.96.757.225.36.32.788.269 1.211l-1.562 4.63ZM4.177 10H7v8a2 2 0 1 1-4 0v-6.823C3 10.527 3.527 10 4.176 10Z" clipRule="evenodd" />
                            </svg>
                            :
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11c.889-.086 1.416-.543 2.156-1.057a22.323 22.323 0 0 0 3.958-5.084 1.6 1.6 0 0 1 .582-.628 1.549 1.549 0 0 1 1.466-.087c.205.095.388.233.537.406a1.64 1.64 0 0 1 .384 1.279l-1.388 4.114M7 11H4v6.5A1.5 1.5 0 0 0 5.5 19v0A1.5 1.5 0 0 0 7 17.5V11Zm6.5-1h4.915c.286 0 .372.014.626.15.254.135.472.332.637.572a1.874 1.874 0 0 1 .215 1.673l-2.098 6.4C17.538 19.52 17.368 20 16.12 20c-2.303 0-4.79-.943-6.67-1.475" />
                            </svg>
                    }

                </button>
            </p>
        </div>
    )
}

export default CommentCard