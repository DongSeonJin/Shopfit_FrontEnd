import React from 'react';

const ReplyList = ({ replies }) => {
    return (
        <div>
            <h2>댓글 목록</h2>
            <ul>
                {replies.map(reply => (
                    <div key={reply.replyId}>
                        <p>
                            댓글 번호: {reply.replyId}  ,     
                            댓글 내용: {reply.content}  
                        </p>
                    </div>
                    
                ))}
            </ul>
        </div>
    );
};

export default ReplyList;
