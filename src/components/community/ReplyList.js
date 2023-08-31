import React from 'react';

const ReplyList = ({ replies, onDeleteReply }) => {
    const nickname = 'nickname1';

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
                            <button onClick={() => onDeleteReply(reply.replyId)}>삭제</button>
                            
                        </p>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ReplyList;
