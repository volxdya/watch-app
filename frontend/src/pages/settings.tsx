import { CameraIcon } from '@/components/icons';
import DefaultLayout from '@/layouts/default';
import user from '@/store/user';
import { getFileUrl } from '@/utils/getFileUrl';
import { uploadFile } from '@/utils/uploadFile';
import { Input } from '@nextui-org/input';
import { Avatar, Button, Form } from '@nextui-org/react';
import { observer } from 'mobx-react-lite';
import { FormEvent, useState } from 'react';
import { Spinner } from '@nextui-org/spinner';

export const SettingsPage = observer(() => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const me = user.me;

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

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center gap-4">
        <div>
          <p className="text-2xl">Настройки канала</p>
        </div>
        <hr className="w-96" />
        <p className="text-xl">Фото профиля</p>
        <p>
          Фото профиля показывается, например, рядом с вашими видео или
          комментариями на Watch.
        </p>
        <Form onSubmit={upload}>
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
            value={me.username}
            placeholder="Username"
            label="Username"
          />

          <Input
            type="text"
            className="mt-2"
            value={me.description}
            placeholder="Description"
            label="Description"
          />

          <Button type="submit" className="w-full mt-2">
            Submit
          </Button>
        </Form>
      </section>
    </DefaultLayout>
  );
});
