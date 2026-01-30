import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export function SuccessModal({
  open,
  onClose,
  title = "Success",
  message = "Operation completed successfully.",
}: SuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="
          sm:max-w-md
          bg-white
          text-slate-900
        "
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-green-600">
    
          </DialogTitle>
        </DialogHeader>

        <p className="mt-2 text-sm text-slate-700">
          {message}
        </p>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="
              rounded-md
              bg-green-600
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              hover:bg-green-700
            "
          >
            OK
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}