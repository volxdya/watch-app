import { EditDocumentIcon, DeleteDocumentIcon } from '@/components/icons';
import user from '@/store/user';
import { deleteRequest } from '@/utils/request';
import { Card, CardBody, CardFooter, CardHeader } from '@nextui-org/card';
import {
  Button,
  cn,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
} from '@nextui-org/react';

interface Props {
  title: string;
  description: string;
  channel: string;
  id: number;
}

export function StudioCard({ title, description, channel, id }: Props) {
  const iconClasses =
    'text-xl text-default-500 pointer-events-none flex-shrink-0';

  async function deleteVideo() {
    deleteRequest('video', 'delete', id);
    user.getMe();
  }

  return (
    <Card className="mt-2">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
          <p className="text-small text-default-500">@{channel}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{description}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">Open Menu</Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dropdown menu with icons" variant="faded">
            <DropdownItem
              key="edit"
              shortcut="⌘⇧E"
              startContent={<EditDocumentIcon className={iconClasses} />}
            >
              Edit video
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              shortcut="⌘⇧D"
              onPress={deleteVideo}
              startContent={
                <DeleteDocumentIcon
                  className={cn(iconClasses, 'text-danger')}
                />
              }
            >
              Delete video
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardFooter>
    </Card>
  );
}
