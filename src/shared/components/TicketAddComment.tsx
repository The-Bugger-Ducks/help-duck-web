import React, { forwardRef, useImperativeHandle, useRef } from 'react';

const TicketAddComment = forwardRef((props, ref) => {
  const inputCommentRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmitComment() {
    return {
      newComment: inputCommentRef.current?.value,
    };
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        submit: handleSubmitComment,
      };
    },
    []
  );

  return (
    <form>
      <h3>Adicionar comentário</h3>
      <div>
        <textarea
          id="description-solution"
          className="description-block"
          placeholder="Escreva seu comentário aqui..."
          ref={inputCommentRef}
          required
          style={{
            width: '100%',
            backgroundColor: '#f2f2f3',
            color: '#495057',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            outline: 'none',
            minHeight: '120px',
            resize: 'vertical',
            padding: '16px',
            lineHeight: '28px',
            marginTop: '16px',
          }}
        />
      </div>
    </form>
  );
});

export default TicketAddComment;
