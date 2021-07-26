import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import { Button, Card, Grid, Icon, Image, Label } from 'semantic-ui-react';
import moment from 'moment';
import LikeButton from '../../components/Buttons/LikeButton/LikeButton';

import { AuthContext } from '../../context/auth/AuthContext';
import DeleteButton from '../../components/Buttons/DeleteButton';

const SinglePost = (props) => {
   const postId = props.match.params.postId;

   const { user } = useContext(AuthContext);

   const { data: { getPost } = {} } = useQuery(FETCH_POST_QUERY, {
      variables: {
         postId
      }
   });

   function deletePostCallback() {
      props.history.push('/');
   }

   let postMarkup;
   if (!getPost) {
      postMarkup = <p>Loading post..</p>;
   } else {
      const { id, body, createdAt, username, comments, likes, likeCount, commentCount } = getPost;

      postMarkup = (
         <Grid>
            <Grid.Row>
               <Grid.Column width={2}>
                  <Image
                     floated="right"
                     size="Medium"
                     src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  />
               </Grid.Column>
               <Grid.Column width={10}>
                  <Card fluid>
                     <Card.Content>
                        <Card.Header>{username}</Card.Header>
                        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                        <Card.Description>{body}</Card.Description>
                     </Card.Content>
                     <hr />
                     <Card.Content extra>
                        <LikeButton id={id} likes={likes} likeCount={likeCount} user={user} />
                        <Button
                           as="div"
                           labelPosition="right"
                           onClikc={() => console.log('comment')}>
                           <Button basic color="blue">
                              <Icon name="comments" />
                           </Button>
                           <Label basic color="blue" pointing="left">
                              {commentCount}
                           </Label>
                        </Button>
                        {user && user.username === username && (
                           <DeleteButton postId={id} callback={deletePostCallback} />
                        )}
                     </Card.Content>
                  </Card>
               </Grid.Column>
            </Grid.Row>
         </Grid>
      );
   }

   return postMarkup;
};

const FETCH_POST_QUERY = gql`
   query ($postId: ID!) {
      getPost(postId: $postId) {
         id
         body
         createdAt
         username
         likeCount
         likes {
            username
         }
         commentCount
         comments {
            id
            username
            createdAt
            body
         }
      }
   }
`;

export default SinglePost;
