import DefaultLayout from '@/layouts/default';
import VideoCard from '@/shared/VideoCard';
import user from '@/store/user';
import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  User,
} from '@nextui-org/react';
import { observer } from 'mobx-react-lite';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NotFoundPage from './not-found';
import { stopDefault } from '@/utils/stopDefault';
import { postRequest } from '@/utils/request';
import { onChange } from '@/utils/onChange';
import { IVideo } from '@/types/video';

let arr: number[] = new Array(25).fill(1);

export const ProfilePage = observer(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { username } = useParams();

  const handleOpen = () => {
    onOpen();
  };

  const userStore = user.requestUser;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [selectedFile, setSelectedFile] = useState(null);
  const [videoId, setVideoId] = useState('0');

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmitFile = async (e: any) => {
    stopDefault(e);
    if (!selectedFile) {
      console.error('Файл не выбран!');
      return;
    }
    const formData = new FormData();
    formData.append('video', selectedFile);
    formData.append('videoId', videoId.toString());

    try {
      const response = await postRequest('video', 'upload', formData);

      console.log(response.data);
      console.log(response.statusText);
      console.log(response.status);
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  const handleSubmitVideo = async (e: FormEvent) => {
    stopDefault(e);

    await postRequest('video', 'create', {
      userId: user.userData.id,
      title: title,
      description: description,
    }).then(() => {
      user.getOneUser(userStore.username);
      setTitle('');
      setDescription('');
    });
  };

  useEffect(() => {
    if (username) {
      user.getOneUser(username);
    }
  }, []);

  useEffect(() => {}, [userStore.videos]);

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

          <Form onSubmit={handleSubmitFile}>
            <Input
              label="Title"
              type="text"
              value={title}
              className="mt-2"
              isRequired
              onChange={onChange(setTitle)}
            />
            <Input
              label="Description"
              type="text"
              className="mt-2"
              isRequired
              value={description}
              onChange={onChange(setDescription)}
            />
            <Button type="submit" className="w-96">
              Submit
            </Button>
          </Form>

          <Form onSubmit={handleSubmitFile}>
            <Input
              label="File"
              type="file"
              className="mt-2"
              isRequired
              accept="video/*"
              onChange={handleFileChange}
            />
            <Input
              label="Video ID"
              type="text"
              className="mt-2"
              isRequired
              onChange={onChange(setVideoId)}
            />
            <Button type="submit" className="w-96">
              Submit
            </Button>
          </Form>

          <hr className="w-96" />

          <div className="flex gap-12 flex-wrap justify-center mt-4">
            {userStore.videos
              .map((item: IVideo, index: number) => {
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
