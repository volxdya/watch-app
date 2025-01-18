import DefaultLayout from '@/layouts/default';
import VideoCard from '@/shared/VideoCard';
import video from '@/store/video';
import { IVideo } from '@/types/video';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

export const IndexPage = observer(() => {
  useEffect(() => {
    video.getAllVideos();
  }, []);

  const allVideos: IVideo[] = video.allVideos;

  return (
    <DefaultLayout>
      <section className="flex flex-col gap-4">
        <div className="flex gap-12 flex-wrap justify-center">
          {allVideos.map((item: IVideo) => {
            return (
              <VideoCard
                id={item.id}
                w={96}
                h={123}
                title={item.title}
                preview="https://nextui.org/images/card-example-5.jpeg"
                channel={item.user.username}
                avatarChannel="https://nextui.org/images/breathing-app-icon.jpeg"
              />
            );
          })}
        </div>
      </section>
    </DefaultLayout>
  );
});
