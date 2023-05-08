import React from "react";
 
import { useState } from "react";
import {
  useFloating,
  useHover,
  useInteractions,
  offset,
  autoUpdate,
  safePolygon,
} from "@floating-ui/react";

export default function Popover({ children, renderPopover }) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [offset(5)],
  });

  const hover = useHover(context, {
    handleClose: safePolygon({
      buffer: 1,
    }),
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <div className="App">
      <div ref={refs.setReference} {...getReferenceProps()}>
        {children}
      </div>
      {isOpen && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
        >
          {renderPopover}
        </div>
      )}
    </div>
  );
}
