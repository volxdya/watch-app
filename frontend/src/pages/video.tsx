import DefaultLayout from '@/layouts/default';
import video from '@/store/video';
import { getFileUrl } from '@/utils/getFileUrl';
import { Accordion, AccordionItem } from '@nextui-org/accordion';
import { Link, User } from '@nextui-org/react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const VideoPage = observer(() => {
  const { videoId } = useParams();

  const storeVideo = video.requestVideo;

  useEffect(() => {
    if (videoId) {
      video.getOneVideo(Number(videoId));
    }
  }, []);

  return (
    <DefaultLayout>
      <div>
        {video.requestVideo.videoFile ? (
          <div className="video-container">
            <video
              src={getFileUrl(storeVideo.videoFile)}
              controls
              width={400}
              className="rounded-xl"
            ></video>
            <p className="mt-5 text-xl">{storeVideo.title}</p>
            <Link
              href={`/profile/${storeVideo.user.username}`}
              color="foreground"
            >
              <User
                avatarProps={{
                  src: getFileUrl(storeVideo.user.avatar),
                  isBordered: true,
                  size: 'md',
                }}
                className="mt-3"
                name={storeVideo.user.visibleUsername}
                description={
                  <>
                    <span>@{storeVideo.user.username}</span>
                    <br />
                    <span>20 subscribers</span>
                  </>
                }
              />
            </Link>

            <div className="rounded-xl mt-5 p-2 border-1" color="foreground">
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Accordion 1"
                  title="Description"
                >
                  <p style={{ whiteSpace: 'pre-line' }} className='mt-2 text-container text-gray-500'>
                    {storeVideo.description}
                  </p>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        ) : (
          <div>Нет ничего</div>
        )}
      </div>
    </DefaultLayout>
  );
});
