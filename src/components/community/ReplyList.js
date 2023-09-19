import React, { useState } from 'react';
import { List, ListItem, ListItemText, TextField, Button, Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ClassSharp, Style } from '@material-ui/icons';


const useStyles = makeStyles({
    whiteText: {
        color: '#fff'
    },
    whiteBorder: {
        color: '#fff',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#fff',
        },
    },
});

const ReplyList = ({ replies, onDeleteReply, onUpdateReply }) => {
    const [editingReplyId, setEditingReplyId] = useState(null);
    const [updateReply, setUpdateReply] = useState(''); // updatedContent 상태 추가
    const nickname = 'nickname1';
    const classes = useStyles();


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
            {/* <h2>댓글 목록</h2> */}
            <List>
                {replies.map(reply => (
                    <ListItem key={reply.replyId}>
                        <Avatar src={reply.profileImage} style={{ marginRight: '10px'}}/>
                        <ListItemText
                            primary = {
                                <>
                                <strong>{`${nickname}`}</strong> <br />
                                {
                                    editingReplyId === reply.replyId ? (
                                        <TextField
                                        value={updateReply}
                                        onChange={ (e) => setUpdateReply(e.target.value)} 
                                        InputProps = {{
                                            className: classes.whiteBorder,
                                        }}
                                        variant='outlined'
                                        InputLabelProps={{
                                            className: classes.whiteBorder,
                                        }} />
                                    ) : <span className={classes.whiteText}>{reply.content}</span>

                                }
                                </>
                            }
                        />
                            
                        {editingReplyId === reply.replyId ? (
                            <>
                                <Button color='primary' onClick={() => handleUpdateReply(reply.replyId)}>저장</Button>
                                <Button color='secondary' onClick={handleCancelEdit}>취소</Button>
                            </>
                        ) : (
                            <Button color='primary' onClick={() => handleEditClick(reply.replyId, reply.content)}>수정</Button>
                        )}
                        <Button color='secondary' onClick={() => handleDeleteReply(reply.replyId)}>삭제</Button>

                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default ReplyList;
