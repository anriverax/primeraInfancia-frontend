import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
  DropdownSection
} from "@heroui/react";
import { memo } from "react";
import { roleDisplayNames } from "@/shared/constants";
import { TopBarProps } from "@/shared/types/globals";

const UserAvatar = memo(({ name, avatar, role, email }: TopBarProps): React.JSX.Element => {
  return (
    <div className="flex items-center gap-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar isBordered as="button" className="transition-transform" src={avatar} />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat" disabledKeys={["avatar", "rol"]}>
          <DropdownSection showDivider aria-label="Profile">
            <DropdownItem isReadOnly key="avatar" className="h-14 gap-2 opacity-100">
              <User
                avatarProps={{
                  size: "sm",
                  src: avatar
                }}
                classNames={{
                  name: "text-default-600",
                  description: "text-default-500"
                }}
                description={email}
                name={name}
              />
            </DropdownItem>
            <DropdownItem key="rol" className="text-blue-500 text-center">
              {roleDisplayNames[role]}
            </DropdownItem>
          </DropdownSection>

          <DropdownSection showDivider aria-label="Actions">
            <DropdownItem key="profile">Mi Perfil</DropdownItem>
          </DropdownSection>
          <DropdownSection aria-label="Logout">
            <DropdownItem key="logout" color="danger">
              Cerrar Sesión
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
});

UserAvatar.displayName = "MemorizedUserAvatar";
export default UserAvatar;
