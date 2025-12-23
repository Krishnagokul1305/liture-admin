"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const ReusableDeleteModal = forwardRef(
  ({ trigger, onDelete = () => {} }, ref) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
      open: () => setOpen(true),
      close: () => setOpen(false),
    }));

    const handleDelete = async () => {
      setIsLoading(true);
      try {
        await onDelete();
        toast.success("Item deleted successfully");
        setOpen(false);
      } catch (error) {
        console.error("Error deleting item:", error);
        toast.error("Failed to delete item");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <AlertDialog open={open} onOpenChange={setOpen}>
        {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              item.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              disabled={isLoading}
              onClick={() => setOpen(false)}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-white"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
);

ReusableDeleteModal.displayName = "DeleteModal";

export default ReusableDeleteModal;

// 1st way
// <ReusableDeleteModal
//  trigger={<Button variant="destructive">Delete Post</Button>}
//  onDelete={handleDelete}
//  />

// 2nd way
// const modalRef = useRef();

//   const handleDelete = async () => {
//     await new Promise((res) => setTimeout(res, 1000));
//     console.log("Deleted via imperative call");
//   };

//   return (
//     <div className="p-4">
//       <Button variant="destructive" onClick={() => modalRef.current?.open()}>
//         Open Delete Modal
//       </Button>

//       <ReusableDeleteModal ref={modalRef} onDelete={handleDelete} />
//     </div>
//   );
