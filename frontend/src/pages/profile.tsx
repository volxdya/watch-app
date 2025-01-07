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

let arr: number[] = new Array(25).fill(1);

export const ProfilePage = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { username } = useParams();

  const handleOpen = () => {
    onOpen();
  };

  useEffect(() => {
    if (username) {
      user.getOneUser(username);
    }
  }, []);

  const userStore = user.requestUser;

  return (
    <DefaultLayout>
      {userStore ? (
        <section className="flex flex-col items-center gap-4 py-8 md:py-10">
          <User
            as="button"
            avatarProps={{
              isBordered: true,
              size: 'lg',
              src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
            }}
            className="transition-transform w-full"
            description={`@${userStore.username}`}
            name={userStore.username}
          />

          {userStore.username === user.userData.username && (
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
                      <p>{userStore.description}</p>
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
            {arr.map((index: number) => {
              return (
                <VideoCard
                  key={index}
                  w={96}
                  h={100}
                  title="Your checklist for better sleep"
                  preview="https://nextui.org/images/card-example-5.jpeg"
                  channel="Good channel!"
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
