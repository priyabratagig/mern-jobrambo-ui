import { useEffect } from "react";
import { toast } from "sonner";

export function useToastDismiss() {

    useEffect(() => () => {
        toast.dismiss()
    }, [])

    return undefined
}

export default useToastDismiss