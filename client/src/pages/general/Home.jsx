import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'
import Loader from '../../components/Loader'

const Home = () => {
    const [ videos, setVideos ] = useState([])
    const [loading, setLoading] = useState(true)
    // Autoplay behavior is handled inside ReelFeed
    const Base_Url = import.meta.env.VITE_API_URL


    useEffect(() => {
        axios.get(`${Base_Url}/food`, { withCredentials: true })
            .then(response => {

                console.log(response.data);

                setVideos(response.data.foodItems)
                setLoading(false)
            })
            .catch(() => { setLoading(false) })
    }, [])

    // Using local refs within ReelFeed; keeping map here for dependency parity if needed

    async function likeVideo(item) {

        const response = await axios.post(`${Base_Url}/food/like`, { foodId: item._id }, {withCredentials: true})

        if(response.data.like){
            console.log("Video liked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        }else{
            console.log("Video unliked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }
        
    }

    async function saveVideo(item) {
        const response = await axios.post(`${Base_Url}/food/save`, { foodId: item._id }, { withCredentials: true })
        
        if(response.data.save){
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v))
        }else{
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v))
        }
    }

    return (
        
        <>{loading ? (
               <Loader />
           ) : (
               <ReelFeed
                   items={videos}
                   onLike={likeVideo}
                   onSave={saveVideo}
                   emptyMessage="No videos available."
               />
           )}</>
    )
}

export default Home