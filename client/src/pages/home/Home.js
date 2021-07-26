import React, { useContext } from 'react';

import { useQuery } from '@apollo/client';

import { Grid } from 'semantic-ui-react';

import PostForm from '../../components/Forms/PostForm/post-form';
import PostCard from '../../components/Cards/PostCard/post-card';

import { AuthContext } from '../../context/auth/auth-context';
import { FETCH_POSTS_QUERY } from '../../utils/graphql/graphql';

const Home = () => {
   const { user } = useContext(AuthContext);

   const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);

   return (
      <Grid columns={1}>
         <Grid.Row>
            <Grid.Column className="f j-c-c" style={{ marginBottom: 20 }}>
               {user && <PostForm />}
            </Grid.Column>
         </Grid.Row>
         <Grid.Row>
            {loading ? (
               <h1>loading posts...</h1>
            ) : (
               posts &&
               posts.map((post) => (
                  <Grid.Column key={post.id} className="f j-c-c" style={{ marginBottom: 20 }}>
                     <PostCard post={post} />
                  </Grid.Column>
               ))
            )}
         </Grid.Row>
      </Grid>
   );
};

export default Home;
