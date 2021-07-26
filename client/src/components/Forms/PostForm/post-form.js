import React from 'react';
import { Button, Form, Grid } from 'semantic-ui-react';

import gql from 'graphql-tag';

import useForm from '../../../utils/hooks/useForm';
import { useMutation } from '@apollo/client';
import { FETCH_POSTS_QUERY } from '../../../utils/graphql/graphql';

const PostForm = () => {
   const { onChange, onSubmit, values } = useForm(createPostCallback, {
      body: ''
   });

   const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
      variables: values,
      update(proxy, result) {
         console.log(result);

         const data = proxy.readQuery({
            query: FETCH_POSTS_QUERY
         });
         proxy.writeQuery({
            query: FETCH_POSTS_QUERY,
            data: {
               getPosts: [result.data.createPost, ...data.getPosts]
            }
         });
         values.body = '';
      }
   });

   function createPostCallback() {
      createPost();
   }

   return (
      <div className="f f-d-c">
         {error && (
            <div className="ui error message w-50">
               <ul className="list">
                  <li>{error.graphQLErrors[0].message}</li>
               </ul>
            </div>
         )}
         <Form onSubmit={onSubmit} className="w-50" style={{ marginTop: 20 }}>
            <h2>Create a post:</h2>
            <Form.Field>
               <Form.Input
                  placeholder="Hi World !"
                  name="body"
                  onChange={onChange}
                  value={values.body}
                  error={!!error}
               />
               <Button type="submit" color="teal">
                  Submit
               </Button>
            </Form.Field>
         </Form>
      </div>
   );
};

const CREATE_POST_MUTATION = gql`
   mutation createPost($body: String!) {
      createPost(body: $body) {
         id
         username
         body
         createdAt
         likes {
            id
            username
            createdAt
         }

         likeCount
         comments {
            id
            body
            username
            createdAt
         }
         commentCount
      }
   }
`;

export default PostForm;
