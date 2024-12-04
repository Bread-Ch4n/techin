export default function Home() {
  const decorations = [];
  const emojis = ["🎁", "🎄", "✨", "🎀", "🎆"];
  for (let i = 0; i < 10 * 10; i++) {
    const empty = Math.random() < 0.5;
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    decorations.push(
      <div
        className={`rounded relative flex flex-col items-center justify-center overflow-hidden hover:scale-[1.2] hover:z-[2] select-none transition-transform duration-300 ease-in-out ${empty ? "bg-transparent" : Math.random() < 0.5 ? "bg-red-300" : "bg-green-300"}`}
        key={i}
      >
        {!empty && <p className="text-center text-5xl">{emoji}</p>}
      </div>,
    );
  }
  return (
    <main>
      <div className="grid grid-cols-10 grid-rows-10 size-[60vw] absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 gap-1 bg-red-600 p-[150px] rounded-full">
        <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-500 rounded-full z-10" />

        {decorations.map((item) => item)}
      </div>
    </main>
  );
}
