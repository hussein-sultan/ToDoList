export default function Note({ title, noteClick, active }) {
  return (
    <li
      className={`font-bold  border-b p-2  text-[#1B1A17] hover:pr-5  transition-all ${
        active ? "bg-[#f0a400d0]" : ""
      }`}
      style={{ lineBreak: "anywhere" }}
      onClick={noteClick}
    >
      {" "}
      {title}
    </li>
  );
}
