import React, {useState, useEffect} from 'react';
import appwriteService from '../appwrite/config'
import { PostCard, Container } from '../components';

function AllPosts() {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
      appwriteService.getPosts([]).then((posts)=> {
          if(posts){
              setPosts(posts.documents)
          }
      })
    }, [])
  return posts.length > 0 ? (
    <div className='w-full py-8'>
      <Container>
        <div className="flex flex-wrap">
            {posts.map((post) => (
                <div key={post.$id} className='p-2 w-full md:w-1/3 lg:w-1/4'>
                    <PostCard {...post} />
                </div>
            ))}
        </div>
      </Container>
    </div>
  ) : <p className='flex justify-center items-center py-20 text-4xl'>No posts to show</p>
}

export default AllPosts
