import { User, UsersType } from "@/types/user";

export function UsersPage({users}: {users: UsersType}) {
    return (
        <div>
            {users.map((item: User) => {
                return (
                    <div>{item.username}</div>
                )
            })}
        </div>
    )
}