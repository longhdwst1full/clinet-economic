import { Fragment, useRef } from "react"

export default function InputFile({ onChange }) {
  const fileInputRef = useRef(null);

  const onFileChange = (event) => {
    const fileFromLocal = event.target.files?.[0];
    fileInputRef.current?.setAttribute("value", "");

    onChange && onChange(fileFromLocal);
  };
  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Fragment>
      <input
        className="tw-hidden"
        type="file"
        accept=".jpg,.jpeg,.png"
        ref={fileInputRef}
        onChange={onFileChange}
        onClick={(event) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          event.target.value = null;
        }}
      />
      <button
        className="tw-flex tw-h-10 tw-items-center tw-justify-end tw-rounded-sm tw-border tw-bg-white tw-px-6 tw-text-sm tw-text-gray-600 tw-shadow-sm"
        type="button"
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </Fragment>
  );
}
