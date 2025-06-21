import { Spinner } from "@nextui-org/spinner";

export function Loader() {
    ('pending.')

    return (
        <div className="flex align-center justify-center h-screen">
            <Spinner />
        </div>
    );
}