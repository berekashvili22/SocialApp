import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../../../utils/graphql/graphql';

const DeleteButton = ({ postId, commentId, callback }) => {
   const [confirmOpen, setConfirmOpen] = useState(false);

   const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

   const [deleteItem] = useMutation(mutation, {
      update(proxy) {
         setConfirmOpen(false);

         if (!commentId) {
            const data = proxy.readQuery({
               query: FETCH_POSTS_QUERY
            });
            const cleanedPostsData = data.getPosts.filter((p) => p.id !== postId);
            proxy.writeQuery({
               query: FETCH_POSTS_QUERY,
               data: {
                  getPosts: [...cleanedPostsData]
               }
            });
         }
         if (callback) callback();
      },
      variables: {
         postId,
         commentId
      }
   });

   return (
      <>
         <Button basic as="div" floated="right" onClick={() => setConfirmOpen(true)}>
            <Icon name="trash" color="red" style={{ margin: 0 }} />
         </Button>
         <Confirm
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={deleteItem}
         />
      </>
   );
};

const DELETE_POST_MUTATION = gql`
   mutation deletePost($postId: ID!) {
      deletePost(postId: $postId)
   }
`;

const DELETE_COMMENT_MUTATION = gql`
   mutation deleteComment($postId: ID!, $commentId: ID!) {
      deleteComment(postId: $postId, commentId: $commentId) {
         id
         comments {
            id
            username
            createdAt
            body
         }
         commentCount
      }
   }
`;

export default DeleteButton;
