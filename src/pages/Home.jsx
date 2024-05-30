import React, {useEffect, useState} from 'react'
import appwriteService from '../appwrite/config';
import { Container, PostCard } from '../components';
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setposts] = useState([]);
    useEffect(()=>{
        appwriteService.getPosts().then( posts => {
            if (posts) {
                setposts(posts.documents);
            }
        })
    }, []);
    
    if(posts.length === 0 ){
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-grey-500 text-white">
                                Login to read posts.
                                <br />
                                <span 
                                    className='text-sm text-gray-500'
                                >
                                    If already Login and no posts are there, then 
                                    <Link
                                        to="/add-post"
                                        className='font-medium text-pretty transition-all duration-200 hover:underline'
                                    >
                                        <span> Add Post</span>
                                    </Link>
                                </span>
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    } 

    return (
        <div className="w-full py-8">
            <Container>
                <div className="flex flex-wrap">
                    {posts.map(post=>(
                        <div key={post.$id} className='p-2 px-10 w-full md:w-1/3 md:px-2 lg:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
