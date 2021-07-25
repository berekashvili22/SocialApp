import React from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';

const PostCard = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) => {
   console.log(body);

   const likePost = () => {
      console.log('like');
   };

   const commentPost = () => {
      console.log('comment');
   };

   return (
      <Card>
         <Card.Content>
            <Image
               floated="right"
               size="mini"
               src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            />
            <Card.Header>{username}</Card.Header>
            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
            <Card.Description>{body}</Card.Description>
         </Card.Content>
         <Card.Content extra>
            <Button as="div" labelPosition="right" onClick={likePost}>
               <Button basic color="red">
                  <Icon name="heart" />
               </Button>
               <Label basic color="red" pointing="left">
                  {likeCount}
               </Label>
            </Button>
            <Button as="div" labelPosition="right" onClick={commentPost}>
               <Button basic color="blue">
                  <Icon name="comments" />
               </Button>
               <Label basic color="blue" pointing="left">
                  {commentCount}
               </Label>
            </Button>
         </Card.Content>
      </Card>
   );
};

export default PostCard;
