import { Card, CardFooter, CardHeader } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Link } from '@nextui-org/link';
import { getFileUrl } from '@/utils/getFileUrl';

interface Props {
  w: number;
  h: number;
  title: string;
  channel: string;
  avatarChannel: string;
  id: number;
}

export default function VideoCard({
  w,
  h,
  title,
  channel,
  avatarChannel,
  id,
}: Props) {
  const temporaryPreivew: string = 'https://random-image-pepebigotes.vercel.app/api/random-image';

  return (
    <Link href={`/video/${id}`}>
      <Card
        isFooterBlurred
        className={`w-${w} h-[${h}px] col-span-12 sm:col-span-7 flex cursor-pointer hover:scale-[105]`}
      >
        <CardHeader className="absolute z-10 top-1 flex-col items-start">
          <h4 className="text-white/90 font-medium text-xl">{title}</h4>
        </CardHeader>
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src={temporaryPreivew}
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <Image
              alt="Breathing app icon"
              className="rounded-full w-10 h-11 bg-black"
              src={getFileUrl(avatarChannel)}
            />
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">{channel}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
