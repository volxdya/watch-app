import DefaultLayout from '@/layouts/default';
import { StudioCard } from '@/shared/StudioCard';
import user from '@/store/user';
import { getItem } from '@/utils/localStorage';
import { onChange } from '@/utils/onChange';
import { postRequest } from '@/utils/request';
import { stopDefault } from '@/utils/stopDefault';
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
} from '@nextui-org/react';
import { observer } from 'mobx-react-lite';
import { FormEvent, useEffect, useState } from 'react';
import { Pagination } from '@nextui-org/react';
import { AxiosResponse } from 'axios';
import { uploadFile } from '@/utils/uploadFile';
import { Textarea } from '@nextui-org/input';
import { UserType } from '@/types/user';
import { VideoTypeNoUser } from '@/types/video';

export const StudioPage = observer(() => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [page, setPage] = useState(0);
  const [videoId, setVideoId] = useState(0);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const me: UserType = user.me;

  const handleSubmitVideo = async (e: FormEvent) => {
    stopDefault(e);

    await postRequest('video', 'create', {
      userId: user.userData.id,
      title: title,
      description: description,
    }).then((resp: AxiosResponse) => {
      user.getOneUser(me.username);
      setTitle('');
      setDescription('');
      setVideoId(resp.data.id);
      setPage(1);
    });
  };

  const handleSubmitFile = async (e: FormEvent) => {
    async function helper() {
      onClose();
      setPage(0);
      setVideoId(0);
    }

    uploadFile(
      e,
      [
        { key: 'video', value: selectedFile },
        { key: 'videoId', value: videoId.toString() },
      ],
      selectedFile,
      helper,
      'video',
    );
  };

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    user.getMe();
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center gap-4">
        {getItem('token') ? (
          <div className="p-5 lg:w-[600px] xs:m-[350px] sm:w-96 items-center">
            <p className="text-xl text-center">Контент</p>

            <div className="flex items-center justify-center w-full mt-5">
              <Button onPress={onOpen}>Добавить видео</Button>
            </div>

            <Modal
              isDismissable={false}
              isKeyboardDismissDisabled={true}
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              backdrop="blur"
              size="2xl"
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      Добавить видео
                    </ModalHeader>
                    {page === 0 ? (
                      <ModalBody>
                        <p>
                          <Form onSubmit={handleSubmitVideo}>
                            <Input
                              label="Title"
                              type="text"
                              value={title}
                              className="mt-2"
                              isRequired
                              maxLength={255}
                              onChange={onChange(setTitle)}
                            />
                            <Textarea
                              label="Description"
                              type="text"
                              className="mt-2"
                              isRequired
                              value={description}
                              onChange={onChange(setDescription)}
                              isInvalid={description.length === 255}
                              errorMessage='Максимальная длина - 255'
                              maxLength={255}
                            />
                            <p className='text-sm m-0 p-0'>{description.length}/255</p>
                            <Button type="submit" className="w-full mt-5">
                              Next
                            </Button>
                          </Form>
                        </p>
                      </ModalBody>
                    ) : (
                      <Form onSubmit={handleSubmitFile} className="">
                        <div className="flex justify-center w-full">
                          <Input
                            label="File"
                            type="file"
                            className="mt-2 w-11/12"
                            isRequired
                            accept="video/*"
                            onChange={handleFileChange}
                          />
                        </div>
                        <div className="flex justify-center w-full mt-2">
                          <Button type="submit" className="w-11/12">
                            Submit
                          </Button>
                        </div>
                      </Form>
                    )}
                    <ModalFooter>
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>

            <div className="mt-5">
              {me.videos.map((item: VideoTypeNoUser) => (
                <StudioCard
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  channel={me.username}
                />
              ))}
            </div>

            {me.videos.length > 10 && (
              <div className="mt-5 flex justify-center ">
                <Pagination initialPage={1} total={10} />
              </div>
            )}
          </div>
        ) : (
          <div>Необходимо авторизоваться</div>
        )}
      </section>
    </DefaultLayout>
  );
});
