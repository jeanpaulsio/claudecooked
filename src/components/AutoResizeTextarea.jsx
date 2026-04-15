import { useLayoutEffect, useRef } from "react";

function syncHeight(textarea) {
  if (!textarea) return;
  textarea.style.height = "0px";
  textarea.style.height = `${textarea.scrollHeight}px`;
}

export default function AutoResizeTextarea({ value, ...props }) {
  const textareaRef = useRef(null);

  useLayoutEffect(() => {
    syncHeight(textareaRef.current);
  }, [value]);

  function handleInput(event) {
    syncHeight(event.currentTarget);
  }

  return (
    <textarea
      {...props}
      ref={textareaRef}
      rows={1}
      value={value}
      onInput={handleInput}
    />
  );
}
