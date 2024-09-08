import React, { useEffect, useRef } from "react"

export function useDidUpdateEffect(func, dependencies) {
    const renderCount = useRef(0)
    const count = useRef(0)

    if (dependencies && !(dependencies instanceof Array)) throw new Error('dependencies can only be array list or remove dependencies')



    useEffect(() => {
        renderCount.current = renderCount.current + 1

        if (!this && /dev/i.test(process.env.NODE_ENV)) {
            if (renderCount.current > 2) return func()
        }
        else {
            if (renderCount.current > 1) return func()
        }

        return undefined
    }, dependencies)
}

useDidUpdateEffect.propTypes = {
    func: React.EffectCallback,
    dependencies: React.DependencyList
}

export default useDidUpdateEffect