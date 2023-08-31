import React from 'react';

const ReplyList = ({ replies, onDeleteReply }) => {
    const nickname = 'nickname1';

    // const handleDeleteReply = (replyId) => {
    //     const shouldDelete = window.confirm('댓글을 삭제하시겠습니까?');
    //     if (shouldDelete) {
    //         onDeleteReply (replyId);
    //     }
    // };

    const handleDeleteReply = (replyId) => {
        if (window.confirm('댓글을 삭제하시겠습니까?')) {
            onDeleteReply(replyId);
        }
    };

    return (
        <div>
            <h2>댓글 목록</h2>
            <ul>
                {replies.map(reply => (
                    <div key={reply.replyId}>
                        <p>
                            댓글 번호: {reply.replyId},   
                            댓글 작성자: {nickname},  
                            댓글 내용: {reply.content}  
                            <button onClick={() => handleDeleteReply(reply.replyId)}>삭제</button>
                            
                        </p>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ReplyList;
