type TimehseetSubmitApi = {
    submit: () => never;
}

export const useTimesheetSubmit: () => TimehseetSubmitApi = () => {
    const dispatch = useDispatch()
    
    const api: TimehseetSubmitApi = useMemo(() => {
        
    }, [])
    
    return api;
}