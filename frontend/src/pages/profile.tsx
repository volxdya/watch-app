import DefaultLayout from '@/layouts/default';
import VideoCard from '@/shared/VideoCard';
import user from '@/store/user';
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
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from './not-found';
import { IVideo } from '@/types/video';
import { API } from '@/utils/env';

export const ProfilePage = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { username } = useParams();

  const handleOpen = () => {
    onOpen();
  };

  const userStore = user.requestUser;

  const isYourProfile = userStore.username === user.userData.username;

  useEffect(() => {
    if (username) {
      user.getOneUser(username);
    }
  }, []);

  return (
    <DefaultLayout>
      {userStore ? (
        <section className="flex flex-col items-center gap-4 py-8 md:py-10">
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              size: 'lg',
              src: `${API}/${userStore.avatar.split('/')[1]}`,
            }}
            className="transition-transform w-full"
            description={`@${userStore.username}`}
            name={userStore.visibleUsername}
          />

          {isYourProfile && (
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
                    {`Описание ${userStore.username}`}
                  </ModalHeader>
                  <ModalBody>
                    {userStore.description ? (
                      <p style={{ whiteSpace: 'pre-line' }}>
                        {userStore.description}
                      </p>
                    ) : (
                      <p>Пока здесь ничего нет.</p>
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>

          <hr className="w-96" />

          <div className="flex gap-12 flex-wrap justify-center mt-4">
            {userStore.videos.map((item: IVideo, index: number) => {
              return (
                <VideoCard
                  key={index}
                  w={96}
                  h={100}
                  id={item.id}
                  title={item.title}
                  preview="https://nextui.org/images/card-example-5.jpeg"
                  channel={userStore.username}
                  avatarChannel="https://nextui.org/images/breathing-app-icon.jpeg"
                />
              );
            })}
          </div>
        </section>
      ) : (
        <NotFoundPage />
      )}
    </DefaultLayout>
  );
});
