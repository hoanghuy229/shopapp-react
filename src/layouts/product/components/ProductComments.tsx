import React, { useState, useEffect } from "react";
import { CommentResponse } from "../../../responses/CommentResponse";
import { getAllCommentOfProduct } from "../../../api/ProductApi";
import { Pagination } from "../../utils/Pagination";
import { Star, StarFill } from "react-bootstrap-icons"; // Assuming icons are imported correctly
import { Rating } from "../../utils/Rating";
import { deleteComment, submitComment, updateComment } from "../../../api/UserApi";
import { CommentDTO } from "../../../dtos/users/CommentDTO";

interface ProductComment {
productId: number;
}

export const ProductComments: React.FC<ProductComment> = (props) => {
    const [comments, setComments] = useState<CommentResponse[]>([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPages, setCurrentPages] = useState(1);

    const [content, setContent] = useState("");
    const [ratingValue, setRatingValue] = useState(0); // Initialize rating to 0

    const [showRatingNotification, setShowRatingNotification] = useState(false);
    const [userId,setUserId] = useState(0);

    useEffect(() => {
        getAllCommentOfProduct(props.productId, currentPages - 1)
        .then((rs) => {
            setComments(rs.result);
            setTotalPages(rs.totalPage);
        })
        .catch((error) => console.log(error));
    }, [currentPages]);

    useEffect(() => {
        const userJSON = localStorage.getItem('user');

        if (userJSON) {
            const user = JSON.parse(userJSON);
            setUserId(user.id);
            
            console.log('User ID:', userId);
        } else {
            console.log('Không tìm thấy đối tượng user trong localStorage.');
        }
    },[])

    const Paginating = (page: number) => {
        setCurrentPages(page);
    };

    const handleRatingButtonClick = () => {
        setShowRatingNotification(true);
    };

    const handleRatingNotificationClose = () => {
        setShowRatingNotification(false);
        setRatingValue(0);
    };

    const handleSubmitComment = async () => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if(!token && !user){
            alert("login to comment");
        }
        const response = await submitComment(props.productId,content,ratingValue);
        setShowRatingNotification(false);
        window.location.reload();
    }

    const handleComment = async (event: React.ChangeEvent<HTMLSelectElement>,commentId:number) => {
        const value = parseInt(event.target.value);
        if(value === 0){//update
            handleRatingButtonClick();
            deleteComment(commentId);
        }
        else if(value === 1){//delete
            const response = await deleteComment(commentId);
            alert(`${response}`)
            window.location.reload();
        }

    }

    return (
        <div className="container mt-4">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            <strong>Comments</strong>
        </h2>
        
            <div>
            <div className="card">
            <div className="card-body">
                {comments.length === 0 ? (
                <div className="text-center" style={{ fontFamily: "monospace", fontSize: "50px" }}>
                Chưa có comment
                </div>
            ) : (
                <div>
                {comments.map((comment) => (
                <div key={comment.id}>
                    <div className="d-flex">
                        <h3 className="mb-1">{comment.user_response.fullname}</h3>
                        <select className="btn" hidden={comment.user_response.id !== userId}  onChange={(e) => handleComment(e, comment.id)}>
                            <option>change</option>
                            <option value={0}>update</option>
                            <option value={1}>delete</option>
                        </select>
                    </div>
                    <div className="d-flex mb-2">
                        <p className="mb-1">{Rating(comment.points ? comment.points : 0)}</p>
                        <p className="mb-1" style={{ marginLeft: "20px" }}>
                            {new Date(comment.create_at).toLocaleString()}
                        </p>
                    </div>
                    <h5 className="mb-1">{comment.content}</h5>
                    <hr />
                </div>
                ))}
            </div>
            )}
            </div>

            {/* Cửa sổ modal để chọn rating */}
            {showRatingNotification && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex={-1} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <h5 className="d-flex justify-content-center mb-2 mt-2">Rating Product</h5>
                    <div className="modal-body d-flex justify-content-center">
                        <div>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <StarFill
                            key={star}
                            onClick={() => setRatingValue(star)}
                            style={{ cursor: "pointer",fontSize:"30px", color: star <= ratingValue ? "gold" : "grey" }} // Set color based on ratingValue
                            />
                        ))}
                        </div>
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                        <label style={{marginRight:"30px"}}>comment:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="content"
                            style={{ width: "300px"}}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleRatingNotificationClose}>
                        Đóng
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSubmitComment}>
                        Lưu đánh giá
                        </button>
                    </div>
                    </div>
                </div>
                </div>
            )}

            <div className="card-footer mt-5">
                <div className="mb-3 input-group">
                </div>
                <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-outline-primary" onClick={handleRatingButtonClick}>
                        Comment
                    </button>
                </div>
            </div>
            </div>
            <div className="d-flex justify-content-center mt-5">
                    <Pagination currentPage={currentPages} totalPage={totalPages} Paginating={Paginating} />
                </div>
            </div>
       
        </div>
    );
    };

