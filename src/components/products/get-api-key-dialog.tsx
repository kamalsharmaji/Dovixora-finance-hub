import type { ReactNode } from "react";
import { KeyRound } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { GetApiKeyForm } from "@/components/products/get-api-key-form";

interface GetApiKeyDialogProps {
  trigger: ReactNode;
}

function GetApiKeyDialog({ trigger }: GetApiKeyDialogProps) {
  return (
    <Dialog>
      {trigger}
      <DialogContent className="max-h-[92vh] max-w-md gap-0 overflow-hidden rounded-2xl border-line p-0 sm:rounded-2xl">
        <DialogTitle className="sr-only">Get your API key</DialogTitle>
        <div className="max-h-[92vh] overflow-y-auto">
          <div className="bg-gradient-to-br from-yellow-deep to-yellow px-6 py-6 sm:px-8">
            <span className="grid size-10 place-items-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
              <KeyRound className="size-5" />
            </span>
            <p className="mt-3 font-display text-lg font-bold text-white">Get Your API Key</p>
            <p className="mt-1 text-sm text-white/85">Free sandbox access — live in minutes.</p>
          </div>
          <div className="p-6 sm:p-8">
            <GetApiKeyForm heading="Tell us about your business" description="We'll send your sandbox API key and next steps within 24 hours." />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { GetApiKeyDialog };
