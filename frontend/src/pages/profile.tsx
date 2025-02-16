import DefaultLayout from '@/layouts/default';
import VideoCard from '@/shared/VideoCard';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  User,
} from '@nextui-org/react';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';
import NotFoundPage from './not-found';
import { API } from '@/utils/env';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/api/queryClient';
import { oneUserFetch } from '@/api/User';
import { Loader } from '@/components/loader';
import { UserType } from '@/types/user';
import { VideoTypeNoUser } from '@/types/video';
import user from '@/store/user';

export const ProfilePage = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { username } = useParams();

  const userName: string = username ? username : '';

  const handleOpen = () => {
    onOpen();
  };

  const dataListQuery = useQuery(
    {
      queryFn: () => oneUserFetch(userName),
      queryKey: ['user'],
    },
    queryClient,
  );

  switch (dataListQuery.status) {
    case 'success':
      const fetchedUser: UserType = dataListQuery.data;

      console.log(fetchedUser);

      return (
        <DefaultLayout>
          {userName ? (
            <section className="flex flex-col items-center gap-4 py-8 md:py-10">
              <User
                as="button"
                avatarProps={{
                  isBordered: true,
                  size: 'lg',
                  src: `${API}/${fetchedUser.avatar.split('/')[1]}`,
                }}
                className="transition-transform w-full"
                description={`@${dataListQuery.data.username}`}
                name={fetchedUser.visibleUsername}
              />

              {user.userData.username === userName && (
                <p className="cursor-pointer text-md">
                  Это ваш профиль и это очень круто.
                </p>
              )}

              <p onClick={handleOpen} className="cursor-pointer text-sm">
                Подробнее
              </p>

              <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        {`Описание ${fetchedUser.username}`}
                      </ModalHeader>
                      <ModalBody>
                        {fetchedUser.description ? (
                          <p style={{ whiteSpace: 'pre-line' }}>
                            {fetchedUser.description}
                          </p>
                        ) : (
                          <p>Пока здесь ничего нет.</p>
                        )}
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>

              <hr className="w-96" />

              <div className="flex gap-12 flex-wrap justify-center mt-4">
                {fetchedUser.videos.map(
                  (item: VideoTypeNoUser, index: number) => {
                    return (
                      <VideoCard
                        key={index}
                        w={96}
                        h={100}
                        id={item.id}
                        title={item.title}
                        channel={fetchedUser.username}
                        avatarChannel={fetchedUser.avatar}
                      />
                    );
                  },
                )}
              </div>
            </section>
          ) : (
            <NotFoundPage />
          )}
        </DefaultLayout>
      );
    case 'pending':
      return <Loader />;
    case 'error':
      return <div>{dataListQuery.error.message}</div>;
  }
});
