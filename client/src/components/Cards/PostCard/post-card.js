import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { AuthContext } from '../../../context/auth/auth-context';
import LikeButton from '../../Buttons/LikeButton/like-button';

const PostCard = ({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) => {
   const { user } = useContext(AuthContext);

   return (
      <Card className="w-50">
         <Card.Content>
            <Image
               circular
               floated="right"
               size="mini"
               src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
            />
            <Card.Header>{username}</Card.Header>
            <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
            <Card.Description>{body}</Card.Description>
         </Card.Content>
         <Card.Content extra>
            <LikeButton id={id} likes={likes} likeCount={likeCount} user={user} />
            <Button as="div" labelPosition="right" as={Link} to={`/posts/${id}`}>
               <Button basic color="blue">
                  <Icon name="comments" />
               </Button>
               <Label basic color="blue" pointing="left">
                  {commentCount}
               </Label>
            </Button>
            {user && user.username === username && (
               <Button
                  basic
                  as="div"
                  // color="red"
                  floated="right"
                  onClick={() => console.log('delete post')}>
                  <Icon name="trash" color="red" style={{ margin: 0 }} />
               </Button>
            )}
         </Card.Content>
      </Card>
   );
};

export default PostCard;
