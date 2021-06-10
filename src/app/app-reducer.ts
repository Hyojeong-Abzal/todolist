export type RequesStatusType = 'idle' | 'loading' | 'succeedeed' | 'failed';
export type ErrorType = string | null

const initialState = {
    status: 'loading' as RequesStatusType,
    error: null as string | null
}

type initialStateType = typeof initialState;
type ActionsType = SetAppStatusType | SetAppErrorType
export const appReducer = (state: initialStateType = initialState, action: ActionsType) : initialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return { ...state, status: action.status}
        case 'APP/SET_ERROR': 
            return {...state, error: action.error}
        default:
            return state
    }
}

export type SetAppStatusType = ReturnType<typeof setAppStatus>
export const setAppStatus = (status: RequesStatusType ) =>( { type: 'APP/SET_STATUS', status} as const )

export type SetAppErrorType = ReturnType<typeof setAppError>
export const setAppError = (error: ErrorType) => ( { type: 'APP/SET_ERROR', error} as const)
