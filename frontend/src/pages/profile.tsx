import { ChevronDownIcon } from '@/components/icons';
import DefaultLayout from '@/layouts/default';
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  User,
} from '@nextui-org/react';
import React from 'react';

export default function ProfilePage() {
  const [selectedOption, setSelectedOption] = React.useState(
    new Set(['merge']),
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = () => {
    onOpen();
  };

  const descriptionsMap = {
    merge:
      'All commits from the source branch are added to the destination branch via a merge commit.',
    squash:
      'All commits from the source branch are added to the destination branch as a single commit.',
    rebase:
      'All commits from the source branch are added to the destination branch individually.',
  };

  const labelsMap = {
    merge: 'Create a merge commit',
    squash: 'Squash and merge',
    rebase: 'Rebase and merge',
  };

  const selectedOptionValue = Array.from(selectedOption)[0];

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

        <ButtonGroup variant="flat">
          <Button>{labelsMap[selectedOptionValue]}</Button>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button isIconOnly>
                <ChevronDownIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Merge options"
              className="max-w-[300px]"
              selectedKeys={selectedOption}
              selectionMode="single"
              onSelectionChange={setSelectedOption}
            >
              <DropdownItem key="merge" description={descriptionsMap['merge']}>
                {labelsMap['merge']}
              </DropdownItem>
              <DropdownItem
                key="squash"
                description={descriptionsMap['squash']}
              >
                {labelsMap['squash']}
              </DropdownItem>
              <DropdownItem
                key="rebase"
                description={descriptionsMap['rebase']}
              >
                {labelsMap['rebase']}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </ButtonGroup>
      </section>
    </DefaultLayout>
  );
}
