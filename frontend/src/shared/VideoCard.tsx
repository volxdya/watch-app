import { Card, CardFooter, CardHeader } from '@nextui-org/card';
import { Button } from '@nextui-org/react';
import { Image } from '@nextui-org/image';

interface Props {
  w: number;
  h: number;
  title: string;
  preview: string;
  channel: string;
  avatarChannel: string;
}

export default function VideoCard({ w, h, title, preview, channel, avatarChannel }: Props) {
  return (
    <Card
      isFooterBlurred
      className={`w-${w} h-[${h}px] col-span-12 sm:col-span-7 flex`}
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        <h4 className="text-white/90 font-medium text-xl">
          {title}
        </h4>
      </CardHeader>
      <Image
        removeWrapper
        alt="Relaxing app background"
        className="z-0 w-full h-full object-cover"
        src={preview}
      />
      <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
        <div className="flex flex-grow gap-2 items-center">
          <Image
            alt="Breathing app icon"
            className="rounded-full w-10 h-11 bg-black"
            src={avatarChannel}
          />
          <div className="flex flex-col">
            <p className="text-tiny text-white/60">{channel}</p>
          </div>
        </div>
        <Button radius="full" size="sm">
          Get App
        </Button>
      </CardFooter>
    </Card>
  );
}
