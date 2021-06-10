import { setAppError, setAppStatus } from './../app/app-reducer'
import { Dispatch } from 'redux'
import { SetAppErrorType, SetAppStatusType } from '../app/app-reducer'
import { ResponseType } from './../api/todolists-api'

export const handleServerAppError = <T>(
  data: ResponseType<T>,
  dispatch: ErrorUtilsDispatchType
) => {
  if (data.messages.length) {
    dispatch(setAppError(data.messages[0]))
  } else {
    dispatch(setAppError('some error occurred'))
  }
  dispatch(setAppStatus('failed'))
}

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: ErrorUtilsDispatchType
) => {
  dispatch(setAppError(error.message))
  dispatch(setAppStatus('failed'))
}
type ErrorUtilsDispatchType = Dispatch<SetAppErrorType | SetAppStatusType>
