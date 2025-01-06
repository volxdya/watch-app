import DefaultLayout from '@/layouts/default';
import VideoCard from '@/shared/VideoCard';
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

let arr: number[] = new Array(25).fill(1);

export default function ProfilePage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center gap-4 py-8 md:py-10">
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
          }}
          className="transition-transform w-full"
          description="@tonyreichert"
          name="Tony Reichert"
        />

        <p onClick={handleOpen} className="cursor-pointer">
          Подробнее
        </p>
        <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Modal Title
                </ModalHeader>
                <ModalBody>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam pulvinar risus non risus hendrerit venenatis.
                    Pellentesque sit amet hendrerit risus, sed porttitor quam.
                  </p>
                  <p>
                    Magna exercitation reprehenderit magna aute tempor cupidatat
                    consequat elit dolor adipisicing. Mollit dolor eiusmod sunt
                    ex incididunt cillum quis. Velit duis sit officia eiusmod
                    Lorem aliqua enim laboris do dolor eiusmod. Et mollit
                    incididunt nisi consectetur esse laborum eiusmod pariatur
                    proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                  </p>
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
