import React, { forwardRef, useImperativeHandle, useRef } from "react";

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
        />
      </div>
    </form>
  );
});

export default TicketAddComment;
