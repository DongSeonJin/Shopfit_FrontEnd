import React, { useState } from 'react';

const ReplyList = ({ replies, onDeleteReply, onUpdateReply }) => {
    const [editingReplyId, setEditingReplyId] = useState(null);
    const [updateReply, setUpdateReply] = useState(''); // updatedContent 상태 추가
    const nickname = 'nickname1';

    const handleEditClick = (replyId, content) => {
        setEditingReplyId(replyId);
        setUpdateReply(content); // 수정 중인 댓글의 내용을 설정
    };

    const handleCancelEdit = () => {
        setEditingReplyId(null);
        setUpdateReply(''); // 수정 취소 시 updatedContent 초기화
    };

    const handleUpdateReply = (replyId) => {
        onUpdateReply(replyId, updateReply); // replyId와 updatedContent를 상위 컴포넌트로 전달
        setEditingReplyId(null);
        setUpdateReply(''); // 수정 후 updatedContent 초기화
    };

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
                            {editingReplyId === reply.replyId ? (
                                <input
                                    type="text"
                                    value={updateReply}
                                    onChange={(e) => setUpdateReply(e.target.value)} // 수정된 내용을 updatedContent 상태에 설정
                                />
                            ) : (
                                <>댓글 내용: {reply.content}</>
                            )}
                            {editingReplyId === reply.replyId ? (
                                <>
                                    <button onClick={() => handleUpdateReply(reply.replyId)}>저장</button>
                                    <button onClick={handleCancelEdit}>취소</button>
                                </>
                            ) : (
                                <button onClick={() => handleEditClick(reply.replyId, reply.content)}>수정</button>
                            )}
                            <button onClick={() => handleDeleteReply(reply.replyId)}>삭제</button>
                        </p>
                    </div>
                ))}
            </ul>
        </div>
    );
};

export default ReplyList;
