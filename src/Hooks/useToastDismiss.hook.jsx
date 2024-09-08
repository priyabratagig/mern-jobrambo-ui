import { useEffect } from "react";
import { toast } from "sonner";

export function useToastDismiss(promise) {

    useEffect(() => () => {
        toast.dismiss()
        promise?.current?.cancel()
    }, [promise])

    return undefined
}

export default useToastDismiss