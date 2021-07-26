import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import { Button, Icon, Label } from 'semantic-ui-react';

const LikeButton = ({ id, likes, likeCount, user }) => {
   const [liked, setLiked] = useState(false);

   useEffect(() => {
      if (user && likes?.find((like) => like.username === user.username)) {
         setLiked(true);
      } else setLiked(false);
   }, [user, likes]);

   const [likePost] = useMutation(LIKE_POST_MUTATION, {
      variables: { postId: id }
   });

   return (
      <Button as="div" labelPosition="right" onClick={likePost}>
         {user ? (
            liked ? (
               <Button color="red">
                  <Icon name="heart" />
               </Button>
            ) : (
               <Button basic color="red">
                  <Icon name="heart" />
               </Button>
            )
         ) : (
            <Button basic color="red" as={Link} to="/login ">
               <Icon name="heart" />
            </Button>
         )}
         <Label basic color="red" pointing="left">
            {likeCount}
         </Label>
      </Button>
   );
};

const LIKE_POST_MUTATION = gql`
   mutation likePost($postId: ID!) {
      likePost(postId: $postId) {
         id
         likes {
            id
            username
         }
         likeCount
      }
   }
`;

export default LikeButton;
