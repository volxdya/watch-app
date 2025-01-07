import { Input } from "@nextui-org/input";

export default function NotFoundPage() {
  return (
    <section className="flex flex-col items-center gap-4 py-8 md:py-10">
      <p>Ничего не найдено.</p>
      <p>Попробуйте что-то найти</p>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input label="Поиск" placeholder="Поиск" type="text" className="w-96" />
      </div>
    </section>
  );
}
