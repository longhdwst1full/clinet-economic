import React, { forwardRef } from "react";
import { useController } from "react-hook-form";

const CustomInputForWorkRef = forwardRef((props, ref) => {
  const {
    placeholder,
    className: classinput,
    name,
    type,
    defaultValue,
    control,
  } = props;
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({
    name,
    control,
    defaultValue,
  });
  return (
    <>
      <div>
        <input
          type={type}
          className={`form-control ${classinput}`}
          placeholder={placeholder}
          {...{ onChange, onBlur, value, name }}
          ref={ref}
        />
      </div>
      <div className="error">{error && error.message}</div>
    </>
  );
});

export default CustomInputForWorkRef;
