import { ReactElement } from "react";

export default function Box({
  children,
  className,
}: {
  children: ReactElement[] | ReactElement;
  className?: string;
}) {
  return (
    <div
      className={
        "my-3 justify-center mx-auto w-auto flex flex-col  bg-neutral-100 rounded-md shadow-md py-2 px-1 gap-2" +
          " " +
          className ?? ""
      }
    >
      {children}
    </div>
  );
}
