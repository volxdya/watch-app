import { UsersType, UserType } from "@/types/user";

export function UsersPage({users}: {users: UsersType}) {
    return (
        <div>
            {users.map((item: UserType) => {
                return (
                    <div>{item.username}</div>
                )
            })}
        </div>
    )
}