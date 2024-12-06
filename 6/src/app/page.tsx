export default function Home() {
  const date = new Date();
  return (
    <main>
      <div
        className={
          "absolute -translate-y-1/2 -translate-x-1/2 top-1/2 left-1/2 w-[12vw] h-[15vh] text-center select-none"
        }
      >
        <div
          className={
            "bg-red-600 h-10 flex flex-col items-center justify-center text-2xl rounded-t-xl"
          }
        >
          {new Intl.DateTimeFormat("en-US", { month: "long" }).format(date)}
        </div>
        <div
          className={
            "bg-white flex flex-col relative items-center h-[100%] rounded-b-xl"
          }
        >
          <div className={"absolute top-5 text-gray-500 text-xl"}>
            {new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date)}
          </div>
          <div
            className={"absolute top-1/2 text-black text-9xl -translate-y-1/2"}
          >
            {date.getDay()}
          </div>
          <div className={"absolute bottom-2 text-gray-500"}>
            {date.getFullYear()}
          </div>
        </div>
      </div>
    </main>
  );
}
