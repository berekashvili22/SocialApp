import React, { useState } from 'react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import { FETCH_POSTS_QUERY } from '../../../utils/graphql/graphql';

const DeleteButton = ({ postId, callback }) => {
   const [confirmOpen, setConfirmOpen] = useState(false);
   const [deletePost] = useMutation(DELETE_POST_MUTATION, {
      update(proxy) {
         setConfirmOpen(false);

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
         if (callback) callback();
      },
      variables: {
         postId: postId
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
            onConfirm={deletePost}
         />
      </>
   );
};

const DELETE_POST_MUTATION = gql`
   mutation deletePost($postId: ID!) {
      deletePost(postId: $postId)
   }
`;

export default DeleteButton;
