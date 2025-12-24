"use client";

import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const ReusableModal = forwardRef(
  ({ title, description, children, Trigger }, ref) => {
    const [open, setOpen] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        {Trigger && <DialogTrigger asChild>{Trigger}</DialogTrigger>}
        <DialogContent>
          <DialogHeader>
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
          <div>
            {children &&
              React.cloneElement(children, { close: () => setOpen(false) })}
          </div>
        </DialogContent>
      </Dialog>
    );
  }
);

ReusableModal.displayName = "Modal";

export default ReusableModal;

//   const modalRef = useRef();

//   return (
//     <div>
//       <button
//         onClick={() => modalRef.current?.open()}
//         className="rounded bg-blue-500 px-4 py-2 text-white"
//       >
//         Open Modal Programmatically
//       </button>

//       <ReusableModal
//         ref={modalRef}
//         title="Ref Modal"
//         description="Opened via ref"
//       >
//         <div>
//           <p>This modal was opened using a ref!</p>
//           <button
//             onClick={() => modalRef.current?.close()}
//             className="mt-4 rounded bg-red-500 px-4 py-2 text-white"
//           >
//             Close
//           </button>
//         </div>
//       </ReusableModal>
//     </div>
//   );

{
  /* <ReusableModal
title="Trigger Modal"
description="Opened via Trigger prop"
Trigger={<button className="rounded bg-green-500 px-4 py-2 text-white">Open Modal</button>}
>
<div>
  <p>This modal was opened via the Trigger button!</p>
</div>
</ReusableModal> */
}
