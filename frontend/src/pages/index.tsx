import DefaultLayout from '@/layouts/default';
import VideoCard from '@/shared/VideoCard';

let arr: number[] = new Array(25).fill(1);

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-4">
        <div className="flex gap-12 flex-wrap justify-center">
          {arr.map(() => {
            return (
              <VideoCard
                w={96}
                h={250}
                title="Your checklist for better sleep"
                preview="https://nextui.org/images/card-example-5.jpeg"
                channel="Good channel!"
                avatarChannel="https://nextui.org/images/breathing-app-icon.jpeg"
              />
            );
          })}
        </div>
      </section>
    </DefaultLayout>
  );
}
