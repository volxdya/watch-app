import { Kbd } from '@nextui-org/kbd';
import { Link } from '@nextui-org/link';
import { Input } from '@nextui-org/input';
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/navbar';
import { link as linkStyles } from '@nextui-org/theme';
import clsx from 'clsx';

import { siteConfig } from '@/config/site';
import { ThemeSwitch } from '@/components/theme-switch';
import {
  GithubIcon,
  DiscordIcon,
  SearchIcon,
  LockIcon,
  MailIcon,
  Add,
} from '@/components/icons';
import { Logo } from '@/components/icons';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/dropdown';
import {
  Button,
  Checkbox,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  User,
} from '@nextui-org/react';
import { useRef, useState } from 'react';
import { onChange } from '@/utils/onChange';
import { postRequest } from '@/utils/request';
import { setItem, getItem } from '@/utils/localStorage';
import { observer } from 'mobx-react-lite';
import user from '@/store/user';
import { logOut } from '@/utils/logOut';
import { getFileUrl } from '@/utils/getFileUrl';

export const Navbar = observer(() => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // TODO: Отрефакторить в один компонент и в один стейт!
  const [loginValue, setLoginValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  const [isSignIn, setIsSignIn] = useState(false);

  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const userData = user.userData;
  const me = user.me;

  function handleChangeIsSignIn(): void {
    setIsSignIn(!isSignIn);
  }

  // TODO вынести эти функции
  async function login(): Promise<void> {
    const request = await postRequest('auth', 'signIn', {
      username: loginValue,
      password: passwordValue,
    });

    if (request.data.access_token) {
      setItem('token', request.data.access_token);
      window.location.reload();
    }
  }

  async function register(): Promise<void> {
    await postRequest('user', 'register', {
      username: loginValue,
      password: passwordValue,
    }).then(() => {
      setLoginValue('');
      setPasswordValue('');
      handleChangeIsSignIn();
      if (usernameRef.current instanceof HTMLInputElement) {
        usernameRef.current.focus();
      }
    });
  }

  // TODO: сделать как минимум рабочей логику фокуса, обработать ошибки, как максимум - сделать более разумный код, пока что этот компонент полностью - шлак
  function handleFocus(): void {
    if (
      usernameRef.current instanceof HTMLInputElement &&
      passwordRef.current instanceof HTMLInputElement
    ) {
      usernameRef.current.blur();
      passwordRef.current.focus();
    }
  }

  function onEnter(event: KeyboardEvent): void {
    (event.key);

    if (event.key === 'Enter') {
      handleFocus();
    }
  }

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: 'bg-default-200',
        input: 'text-sm',
      }}
      className="w-96"
      endContent={
        <Kbd className="hidden lg:inline-block" keys={['command']}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Поиск"
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">Watch</p>
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: 'foreground' }),
                  'data-[active=true]:text-primary data-[active=true]:font-medium',
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-4/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-6">
          <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>
          <Link isExternal href={siteConfig.links.discord} title="Discord">
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
          <Button>
            <Link href="/studio" color="foreground">
              <Add />
              Create
            </Link>
          </Button>

          <div className="flex gap-3 items-center">
            {getItem('token') ? (
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <User
                    as="button"
                    avatarProps={{
                      isBordered: true,
                      src: getFileUrl(user.me.avatar),
                    }}
                    className="transition-transform"
                    description={`@${userData.username}`}
                    name={me.visibleUsername}
                  />
                </DropdownTrigger>
                <DropdownMenu aria-label="User Actions" variant="flat">
                  <DropdownItem key="profile" className="h-14 gap-2">
                    <Link
                      href={`/profile/${userData.username}`}
                      className={clsx(
                        linkStyles({ color: 'foreground' }),
                        'data-[active=true]:text-primary data-[active=true]:font-medium',
                      )}
                    >
                      <div>
                        <p className="font-bold">Signed in as</p>
                        <p className="font-bold">@{userData.username}</p>
                      </div>
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="settings">
                    <Link
                      href="/settings"
                      color="foreground"
                      className="w-full"
                    >
                      Settings
                    </Link>
                  </DropdownItem>
                  <DropdownItem key="team_settings">Team Settings</DropdownItem>
                  <DropdownItem key="analytics">Analytics</DropdownItem>
                  <DropdownItem key="system">System</DropdownItem>
                  <DropdownItem key="configurations">
                    Configurations
                  </DropdownItem>
                  <DropdownItem key="help_and_feedback">
                    Help & Feedback
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger" onPress={logOut}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ) : (
              <>
                <Button color="primary" onPress={onOpen}>
                  Войти
                </Button>
                <Modal
                  isOpen={isOpen}
                  placement="top-center"
                  onOpenChange={onOpenChange}
                  backdrop="blur"
                >
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader className="flex flex-col gap-1">
                          {isSignIn ? <p>Register</p> : <p>Sign in</p>}
                        </ModalHeader>
                        <ModalBody>
                          <Input
                            endContent={
                              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            label="Username"
                            placeholder="Enter your username"
                            variant="bordered"
                            value={loginValue}
                            onChange={onChange(setLoginValue)}
                            ref={usernameRef}
                          />
                          <Input
                            endContent={
                              <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                            }
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            variant="bordered"
                            value={passwordValue}
                            onChange={onChange(setPasswordValue)}
                            ref={passwordRef}
                          />
                          <div className="flex py-2 px-1 justify-between">
                            <Checkbox
                              classNames={{
                                label: 'text-small',
                              }}
                            >
                              Remember me
                            </Checkbox>
                            <div className="flex flex-col">
                              {!isSignIn ? (
                                <>
                                  <Link
                                    color="primary"
                                    href="#"
                                    size="sm"
                                    onPress={handleChangeIsSignIn}
                                  >
                                    Register
                                  </Link>
                                  <Link color="primary" href="#" size="sm">
                                    Forgot password?
                                  </Link>
                                </>
                              ) : (
                                <Link
                                  color="primary"
                                  href="#"
                                  size="sm"
                                  onPress={handleChangeIsSignIn}
                                >
                                  Sign in
                                </Link>
                              )}
                            </div>
                          </div>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            color="danger"
                            variant="flat"
                            onPress={onClose}
                          >
                            Close
                          </Button>
                          {!isSignIn ? (
                            <Button color="primary" onPress={login}>
                              Sign in
                            </Button>
                          ) : (
                            <Button color="primary" onPress={register}>
                              Regigser
                            </Button>
                          )}
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </>
            )}
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? 'primary'
                    : index === siteConfig.navMenuItems.length - 1
                      ? 'danger'
                      : 'foreground'
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
});
