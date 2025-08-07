import { CameraIcon } from '@/components/icons';
import DefaultLayout from '@/layouts/default';
import user from '@/store/user';
import { getFileUrl } from '@/utils/getFileUrl';
import { uploadFile } from '@/utils/uploadFile';
import { Input, Textarea } from '@nextui-org/input';
import { Avatar, Button, Form, InputOtp } from '@nextui-org/react';
import { observer } from 'mobx-react-lite';
import { FormEvent, useState } from 'react';
import { Spinner } from '@nextui-org/spinner';
import { stopDefault } from '@/utils/stopDefault';
import { patchRequest } from '@/utils/request';
import { onChange } from '@/utils/onChange';
import { botConfig } from '@/config/site';

export const SettingsPage = observer(() => {
  const me = user.me;

  const [selectedFile, setSelectedFile] = useState(null);
  const [visibleUsername, setVisibleUsername] = useState(me.visibleUsername);
  const [description, setDescription] = useState(me.description);
  const [isLoading, setIsLoading] = useState(false);

  function helper() {
    setSelectedFile(null);
    user.getMe();
  }

  async function upload(e: FormEvent) {
    setIsLoading(true);

    uploadFile(
      e,
      [
        { key: 'avatar', value: selectedFile },
        { key: 'userId', value: me.id },
      ],
      selectedFile,
      helper,
      'user',
    );

    setIsLoading(false);
  }

  const handleFileChange = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };

  async function updateData(e: FormEvent) {
    stopDefault(e);

    if (selectedFile) {
      await upload(e);
    }

    await patchRequest('user', 'update', me.id, {
      visibleUsername: visibleUsername,
      description: description,
    }).then(() => {
      user.getMe();
    });
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center gap-4">
        <div>
          <p className="text-2xl">Настройки канала</p>
        </div>
        <hr className="w-96" />
        <p className="text-xl mt-5">Ваш ID</p>
        <InputOtp
          isReadOnly
          defaultValue={me.id.toString()}
          length={me.id.toString().length}
        />
        <p className="text-xl mt-5">Фото профиля</p>
        <Form onSubmit={updateData}>
          <div className="flex gap-5 items-center">
            <div>
              <Input
                label="File"
                type="file"
                className="mt-2 w-11/12"
                isRequired
                onChange={handleFileChange}
              />
              <p className="w-96 mt-5 text-xs text-default-500">
                Рекомендуем использовать изображение размером не менее 98 х 98
                пикселей в формате PNG или GIF. Анимированные картинки загружать
                нельзя. Размер файла – не более 4 МБ. Помните, что изображение
                должно соответствовать правилам сообщества Watch.
              </p>
            </div>

            {isLoading ? (
              <Spinner />
            ) : (
              <div className="h-32 flex border-1 rounded-2xl">
                {me.avatar ? (
                  <img
                    src={getFileUrl(me.avatar)}
                    alt="Ваша аватарка"
                    className="rounded-2xl"
                  />
                ) : (
                  <div className="h-full w-48 flex items-center justify-center">
                    <Avatar
                      showFallback
                      size="lg"
                      fallback={
                        <CameraIcon
                          className="animate-pulse w-6 h-6 text-default-500"
                          fill="currentColor"
                          size={20}
                        />
                      }
                      src="https://images.unsplash.com/broken"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
          <Input
            type="text"
            className="mt-5"
            value={visibleUsername}
            placeholder="Username"
            label="Username"
            onChange={onChange(setVisibleUsername)}
          />

          <Textarea
            type="text"
            className="mt-2"
            value={description}
            placeholder="Description"
            label="Description"
            onChange={onChange(setDescription)}
          />

          <Button type="submit" className="w-full mt-2">
            Сохранить
          </Button>

          <a href={botConfig.url} target="_blank" className="w-full">
            <Button type="button" className="w-full mt-2" color="primary">
              Привязать Telegram
            </Button>
          </a>
        </Form>
      </section>
    </DefaultLayout>
  );
});
