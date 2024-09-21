export default function NoteForm({
  title,
  content,
  formTitle,
  titleChanged,
  contentChanged,
  submitClick,
  submitText,
}) {

  return (
    <div className={`w-full py-6 px-12`}>
      <h2 className={`text-2xl text-[#E6D5B8] mb-5`}>{formTitle}</h2>
      <div>
        <input
          className={`block w-full py-2 px-3 rounded mb-4 bg-[#E6D5B8]`}
          type="text"
          name="title"
          placeholder="العنوان"
          value={title}
          onChange={titleChanged}
        />
        <textarea
          className={`resize-none block w-full py-2 px-3 rounded mb-4 bg-[#E6D5B8]`}
          rows={10}
          name="content"
          placeholder="النص"
          value={content}
          onChange={contentChanged}
        />
        <button
          className={`text-xl font-bold bg-[#F0A500] px-5 py-3 rounded`}
          onClick={submitClick}
        >
          {" "}
          {submitText}
        </button>
      </div>
    </div>
  );
}