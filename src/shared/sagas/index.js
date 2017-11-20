import { all, call } from 'redux-saga/effects'
import eventHooksSaga from './eventHooksSaga'
import campaignSaga from './campaignSaga'
import linkAccountSaga from './linkAccountSaga'
import permissionSaga from './permissionSaga'
import planSaga from './planSaga'
import postSaga from './postSaga'
import providerSaga from './providerSaga'
import querySaga from './querySaga'
import userSaga from './userSaga'
import workgroupSaga from './workgroupSaga'

export default function* rootSaga() {
  yield all([
    call(campaignSaga),
    call(eventHooksSaga),
    call(linkAccountSaga),
    call(querySaga),
    call(permissionSaga),
    call(planSaga),
    call(postSaga),
    call(providerSaga),
    call(userSaga),
    call(workgroupSaga),
  ])
}
