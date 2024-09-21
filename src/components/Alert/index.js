export default function Alert({ validationMessages }) {
  return (
    <div
      className={`absolute left-5 bg-[#E45826] text-[#E6D5B8] w-[250px]  top-5 py-3 px-4 rounded`}
    >
      <ul>
        {validationMessages.map((message, index) => (
          <li key={index} className={`mb-1  mr`}>
            - {message}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
}
