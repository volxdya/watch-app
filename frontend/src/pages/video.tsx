import DefaultLayout from '@/layouts/default';
import user from '@/store/user';
import video from '@/store/video';
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
      user.getOneUser(storeVideo.user.username);
    }
  }, []);

  return (
    <DefaultLayout>
      <div>
        {video.requestVideo.videoFile ? (
          <div className="video-container">
            <video
              src={storeVideo.temporaryUrl}
              controls
              width={400}
              className="rounded-xl"
            ></video>
            <p className="mt-5 text-xl">{storeVideo.title}</p>
            <Link href={`/profile/${storeVideo.user.username}`} color='foreground'>
              <User
                avatarProps={{
                  src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
                  isBordered: true,
                  size: 'xl',
                }}
                className="mt-3"
                name={storeVideo.user.username}
                description="20 subscribers"
              />
            </Link>

            <div className="rounded-xl mt-5 p-2 border-1" color='foreground'>
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Accordion 1"
                  title='Description'
                >
                  <p className="mt-2 text-container text-gray-500">
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
