export type RequesStatusType = 'idle' | 'loading' | 'succeedeed' | 'failed';

const initialState = {
    status: 'loading' as RequesStatusType
}