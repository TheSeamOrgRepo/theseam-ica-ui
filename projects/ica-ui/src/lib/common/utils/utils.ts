export const waitOnConditionAsync = async (
  condition,
  timeoutDuration
): Promise<any> => {
  const timeStart: any = new Date()

  const _waitFunc = (callback) => {
    let conditionSuccess = false

    if (condition()) {
      callback()
      conditionSuccess = true
    }

    if (!conditionSuccess) {
      const timeNow: any = new Date()
      const duration = timeNow - timeStart
      if (duration > timeoutDuration) {
        throw new Error('Timed out waiting on condition.')
      }

      setTimeout(() => { _waitFunc(callback) }, 30)
    }
  }

  return new Promise((resolve, reject) => {
    _waitFunc(resolve)
  })
}
