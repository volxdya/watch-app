import DefaultLayout from '@/layouts/default';
import { Card, CardHeader, CardFooter } from '@nextui-org/card';
import { Button } from '@nextui-org/react';
import { Image } from '@nextui-org/image';

let arr: number[] = new Array(25).fill(1);

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col gap-4">
        <div className="flex gap-12 flex-wrap justify-center">
          {arr.map(() => {
            return (
              <Card
                isFooterBlurred
                className="w-96 h-[250px] col-span-12 sm:col-span-7 flex"
              >
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                  <p className="text-tiny text-white/60 uppercase font-bold">
                    Your day your way
                  </p>
                  <h4 className="text-white/90 font-medium text-xl">
                    Your checklist for better sleep
                  </h4>
                </CardHeader>
                <Image
                  removeWrapper
                  alt="Relaxing app background"
                  className="z-0 w-full h-full object-cover"
                  src="https://nextui.org/images/card-example-5.jpeg"
                />
                <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
                  <div className="flex flex-grow gap-2 items-center">
                    <Image
                      alt="Breathing app icon"
                      className="rounded-full w-10 h-11 bg-black"
                      src="https://nextui.org/images/breathing-app-icon.jpeg"
                    />
                    <div className="flex flex-col">
                      <p className="text-tiny text-white/60">Breathing App</p>
                      <p className="text-tiny text-white/60">
                        Get a good night&#39;s sleep.
                      </p>
                    </div>
                  </div>
                  <Button radius="full" size="sm">
                    Get App
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </section>
    </DefaultLayout>
  );
}
