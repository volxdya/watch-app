import video from '@/store/video';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const VideoPage = observer(() => {

  const { videoId } = useParams();

  useEffect(() => {
    if (videoId) {
      video.getOneVideo(Number(videoId));
    }
  }, []);

  useEffect(() => {
    if (video.requestVideo) {
      const a = video.requestVideo.videoFile.split('/')[1];
      axios.get(`/${a}`).then((resp) => {
        console.log(URL.createObjectURL(resp.data));
      })
    }
  }, [video.requestVideo.videoFile]);

  return (
    <div>
      {video.requestVideo.videoFile ? (
        <div>{video.requestVideo.videoFile}</div>
      ) : (
        <div>Нет ничего</div>
      )}
    </div>
  );
});
