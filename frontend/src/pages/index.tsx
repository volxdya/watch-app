import { queryClient } from '@/api/queryClient';
import { videosFetch } from '@/api/Video';
import DefaultLayout from '@/layouts/default';
import VideoCard from '@/shared/VideoCard';
import video from '@/store/video';
import { Video } from '@/types/video';
import { useQuery } from '@tanstack/react-query';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Skeleton } from '@heroui/skeleton';
import { Card } from '@nextui-org/card';

export const IndexPage = observer(() => {
  useEffect(() => {
    video.getAllVideos();
  }, []);

  const dataListQuery = useQuery(
    {
      queryFn: videosFetch,
      queryKey: ['videos'],
    },
    queryClient,
  );

  useEffect(() => {
    videosFetch();
  }, []);

  switch (dataListQuery.status) {
    case 'success':
      return (
        <DefaultLayout>
          <section className="flex flex-col gap-4">
            <div className="flex gap-12 flex-wrap justify-center">
              {dataListQuery.data.map((item: Video) => {
                return (
                  <VideoCard
                    id={item.id}
                    w={96}
                    h={123}
                    title={item.title}
                    preview="https://nextui.org/images/card-example-5.jpeg"
                    channel={item.user.visibleUsername}
                    avatarChannel="https://nextui.org/images/breathing-app-icon.jpeg"
                    key={item.id}
                  />
                );
              })}
            </div>
          </section>
        </DefaultLayout>
      );
    case 'pending':
      return (
        <div>
          <DefaultLayout>
            <section className="flex flex-col gap-4">
              <div className="flex gap-12 flex-wrap justify-center">
                {new Array(10).fill('0').map(() => {
                  return (
                    <Card className="w-[200px] space-y-5 p-4" radius="lg">
                      <Skeleton className="rounded-lg">
                        <div className="h-24 rounded-lg bg-default-300" />
                      </Skeleton>
                      <div className="space-y-3">
                        <Skeleton className="w-3/5 rounded-lg">
                          <div className="h-3 w-3/5 rounded-lg bg-default-200" />
                        </Skeleton>
                        <Skeleton className="w-4/5 rounded-lg">
                          <div className="h-3 w-4/5 rounded-lg bg-default-200" />
                        </Skeleton>
                        <Skeleton className="w-2/5 rounded-lg">
                          <div className="h-3 w-2/5 rounded-lg bg-default-300" />
                        </Skeleton>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          </DefaultLayout>
        </div>
      );
    case 'error':
      return <div>{dataListQuery.error.message}</div>;
  }
});
