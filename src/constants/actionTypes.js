//accountSubscriptions
export const CHECK_STRIPE_STATUS_REQUEST = 'CHECK_STRIPE_STATUS_REQUEST'
export const CHECK_STRIPE_STATUS_SUCCESS = 'CHECK_STRIPE_STATUS_SUCCESS'
export const CREATE_ACCOUNT_SUBSCRIPTION_REQUEST = 'CREATE_ACCOUNT_SUBSCRIPTION_REQUEST'
export const CREATE_ACCOUNT_SUBSCRIPTION_SUCCESS = 'CREATE_ACCOUNT_SUBSCRIPTION_SUCCESS'
export const REACTIVATE_ACCOUNT_SUBSCRIPTION_REQUEST = 'REACTIVATE_ACCOUNT_SUBSCRIPTION_REQUEST'
export const REACTIVATE_ACCOUNT_SUBSCRIPTION_SUCCESS = 'REACTIVATE_ACCOUNT_SUBSCRIPTION_SUCCESS'
export const CANCEL_ACCOUNT_SUBSCRIPTION_REQUEST = 'CANCEL_ACCOUNT_SUBSCRIPTION_REQUEST'
export const CANCEL_ACCOUNT_SUBSCRIPTION_SUCCESS = 'CANCEL_ACCOUNT_SUBSCRIPTION_SUCCESS'
export const FETCH_ACCOUNT_SUBSCRIPTION_FAILURE = 'FETCH_ACCOUNT_SUBSCRIPTION_FAILURE'
export const FETCH_ACCOUNT_SUBSCRIPTION_REQUEST = 'FETCH_ACCOUNT_SUBSCRIPTION_REQUEST'
export const FETCH_ACCOUNT_SUBSCRIPTION_SUCCESS = 'FETCH_ACCOUNT_SUBSCRIPTION_SUCCESS'
export const HANDLE_CREDIT_CARD_INFO_REQUEST = 'HANDLE_CREDIT_CARD_INFO_REQUEST'
export const INITIALIZE_USER_ACCOUNT_SUBSCRIPTION_REQUEST = 'INITIALIZE_USER_ACCOUNT_SUBSCRIPTION_REQUEST'
export const UPDATE_ACCOUNT_SUBSCRIPTION_REQUEST = 'UPDATE_ACCOUNT_SUBSCRIPTION_REQUEST'
export const UPDATE_ACCOUNT_SUBSCRIPTION_SUCCESS = 'UPDATE_ACCOUNT_SUBSCRIPTION_SUCCESS'

//analytics
export const FETCH_ALL_GA_ACCOUNTS_REQUEST = 'FETCH_ALL_GA_ACCOUNTS_REQUEST'
export const FETCH_ALL_GA_ACCOUNTS_SUCCESS = 'FETCH_ALL_GA_ACCOUNTS_SUCCESS'
export const GET_ANALYTICS_REQUEST = 'GET_ANALYTICS_REQUEST'
export const GET_ANALYTICS_SUCCESS = 'GET_ANALYTICS_SUCCESS'
export const SORT_GSC_ANALYTICS = 'SORT_GSC_ANALYTICS'

export const GET_GA_GOALS_REQUEST = 'GET_GA_GOALS_REQUEST'
export const GET_GA_GOALS_SUCCESS = 'GET_GA_GOALS_SUCCESS'

//alerts
export const CLOSE_ALERTS = 'CLOSE_ALERTS'
export const NEW_ALERT = 'NEW_ALERT'

// audits
export const AUDIT_CONTENT_REQUEST = 'AUDIT_CONTENT_REQUEST'
export const AUDIT_CONTENT_SUCCESS = 'AUDIT_CONTENT_SUCCESS'
export const FETCH_CURRENT_AUDIT_REQUEST = 'FETCH_CURRENT_AUDIT_REQUEST'
export const FETCH_CURRENT_AUDIT_SUCCESS = 'FETCH_CURRENT_AUDIT_SUCCESS'
export const FETCH_AUDIT_REQUEST = 'FETCH_AUDIT_REQUEST'
export const FETCH_AUDIT_SUCCESS = 'FETCH_AUDIT_SUCCESS'
export const SET_CURRENT_AUDIT = 'SET_CURRENT_AUDIT'
export const SET_CURRENT_AUDIT_SECTION = 'SET_CURRENT_AUDIT_SECTION'

// audit lists
export const FETCH_AUDIT_LIST_REQUEST = 'FETCH_AUDIT_LIST_REQUEST'
export const FETCH_AUDIT_LIST_SUCCESS = 'FETCH_AUDIT_LIST_SUCCESS'

// audit list items
export const CREATE_AUDIT_LIST_ITEM_REQUEST = 'CREATE_AUDIT_LIST_ITEM_REQUEST'
export const CREATE_AUDIT_LIST_ITEM_SUCCESS = 'CREATE_AUDIT_LIST_ITEM_SUCCESS'
export const DESTROY_AUDIT_LIST_ITEM_REQUEST = 'DESTROY_AUDIT_LIST_ITEM_REQUEST'
export const DESTROY_AUDIT_LIST_ITEM_SUCCESS = 'DESTROY_AUDIT_LIST_ITEM_SUCCESS'
export const FETCH_AUDIT_LIST_ITEM_REQUEST = 'FETCH_AUDIT_LIST_ITEM_REQUEST'
export const FETCH_AUDIT_LIST_ITEM_SUCCESS = 'FETCH_AUDIT_LIST_ITEM_SUCCESS'
export const UPDATE_AUDIT_LIST_ITEM_REQUEST = 'UPDATE_AUDIT_LIST_ITEM_REQUEST'
export const UPDATE_AUDIT_LIST_ITEM_SUCCESS = 'UPDATE_AUDIT_LIST_ITEM_SUCCESS'

//CAMPAIGNs
export const CREATE_CAMPAIGN_REQUEST = 'CREATE_CAMPAIGN_REQUEST'
export const CREATE_CAMPAIGN_SUCCESS = 'CREATE_CAMPAIGN_SUCCESS'
export const DESTROY_CAMPAIGN_REQUEST = 'DESTROY_CAMPAIGN_REQUEST'
export const DESTROY_CAMPAIGN_SUCCESS = 'DESTROY_CAMPAIGN_SUCCESS'
export const FETCH_CAMPAIGN_FAILURE = 'FETCH_CAMPAIGN_FAILURE'
export const FETCH_CAMPAIGN_REQUEST = 'FETCH_CAMPAIGN_REQUEST'
export const FETCH_CAMPAIGN_SUCCESS = 'FETCH_CAMPAIGN_SUCCESS'
export const FETCH_CURRENT_CAMPAIGN_REQUEST = 'FETCH_CURRENT_CAMPAIGN_REQUEST'
export const PUBLISH_CAMPAIGN_REQUEST = 'PUBLISH_CAMPAIGN_REQUEST'
export const PUBLISH_CAMPAIGN_SUCCESS = 'PUBLISH_CAMPAIGN_SUCCESS'
export const SET_CURRENT_CAMPAIGN = 'SET_CURRENT_CAMPAIGN'
export const UPDATE_CAMPAIGN_REQUEST = 'UPDATE_CAMPAIGN_REQUEST'
export const UPDATE_CAMPAIGN_SUCCESS = 'UPDATE_CAMPAIGN_SUCCESS'
export const USER_CAMPAIGNS_OUTDATED = 'USER_CAMPAIGNS_OUTDATED'

//channels
export const CREATE_FAKE_CHANNEL_REQUEST = 'CREATE_FAKE_CHANNEL_REQUEST'
export const CREATE_FAKE_CHANNEL_SUCCESS = 'CREATE_FAKE_CHANNEL_SUCCESS'

//customLists
export const CREATE_CUSTOM_LIST_REQUEST = 'CREATE_CUSTOM_LIST_REQUEST'
export const CREATE_CUSTOM_LIST_SUCCESS = 'CREATE_CUSTOM_LIST_SUCCESS'
export const DESTROY_CUSTOM_LIST_REQUEST = 'DESTROY_CUSTOM_LIST_REQUEST'
export const DESTROY_CUSTOM_LIST_SUCCESS = 'DESTROY_CUSTOM_LIST_SUCCESS'
export const FETCH_CUSTOM_LIST_REQUEST = 'FETCH_CUSTOM_LIST_REQUEST'
export const FETCH_CUSTOM_LIST_SUCCESS = 'FETCH_CUSTOM_LIST_SUCCESS'
export const SET_CURRENT_CUSTOM_LIST = 'SET_CURRENT_CUSTOM_LIST'
export const UPDATE_CUSTOM_LIST_REQUEST = 'UPDATE_CUSTOM_LIST_REQUEST'
export const UPDATE_CUSTOM_LIST_SUCCESS = 'UPDATE_CUSTOM_LIST_SUCCESS'

//errors
export const CLEAR_ERRORS = 'CLEAR_ERRORS'
export const HANDLE_ERRORS = 'HANDLE_ERRORS'

//miscellaneous UI
export const HANDLE_QUERY = 'HANDLE_QUERY'
export const SET_PARAMS = 'SET_PARAMS'
export const CLEAR_PARAMS = 'CLEAR_PARAMS'
export const SET_OPTIONS = 'SET_OPTIONS'
export const FORM_PERSISTED = 'FORM_PERSISTED'

//permissions
export const CREATE_PERMISSION_REQUEST = 'CREATE_PERMISSION_REQUEST'
export const CREATE_PERMISSION_SUCCESS = 'CREATE_PERMISSION_SUCCESS'
export const DESTROY_PERMISSION_REQUEST = 'DESTROY_PERMISSION_REQUEST'
export const DESTROY_PERMISSION_SUCCESS = 'DESTROY_PERMISSION_SUCCESS'
export const FETCH_PERMISSION_FAILURE = 'FETCH_PERMISSION_FAILURE'
export const FETCH_PERMISSION_REQUEST = 'FETCH_PERMISSION_REQUEST'
export const FETCH_PERMISSION_SUCCESS = 'FETCH_PERMISSION_SUCCESS'
export const SET_PERMISSION = 'SET_PERMISSION'
export const UPDATE_PERMISSION_REQUEST = 'UPDATE_PERMISSION_REQUEST'
export const UPDATE_PERMISSION_SUCCESS = 'UPDATE_PERMISSION_SUCCESS'
export const USER_PERMISSIONS_OUTDATED = 'USER_PERMISSIONS_OUTDATED'

//plans
export const ARCHIVE_PLAN_REQUEST = 'ARCHIVE_PLAN_REQUEST'
export const ARCHIVE_PLAN_SUCCESS = 'ARCHIVE_PLAN_SUCCESS'
export const SET_CURRENT_PLAN = 'SET_CURRENT_PLAN'
export const CREATE_PLAN_REQUEST = 'CREATE_PLAN_REQUEST'
export const CREATE_PLAN_SUCCESS = 'CREATE_PLAN_SUCCESS'
export const FETCH_CURRENT_PLAN_REQUEST = 'FETCH_CURRENT_PLAN_REQUEST'
export const FETCH_PLAN_FAILURE = 'FETCH_PLAN_FAILURE'
export const FETCH_PLAN_REQUEST = 'FETCH_PLAN_REQUEST'
export const FETCH_PLAN_SUCCESS = 'FETCH_PLAN_SUCCESS'
export const LIVE_UPDATE_PLAN_REQUEST = 'LIVE_UPDATE_PLAN_REQUEST'
export const LIVE_UPDATE_PLAN_SUCCESS = 'LIVE_UPDATE_PLAN_SUCCESS'
export const LIVE_UPDATE_PLAN_FAILURE = 'LIVE_UPDATE_PLAN_FAILURE'
export const REMOVE_PLAN_REQUEST = 'REMOVE_PLAN_REQUEST'
export const REMOVE_PLAN_SUCCESS = 'REMOVE_PLAN_SUCCESS'
export const UPDATE_PLAN_REQUEST = 'UPDATE_PLAN_REQUEST'
export const UPDATE_PLAN_SUCCESS = 'UPDATE_PLAN_SUCCESS'
export const USER_PLANS_OUTDATED = 'USER_PLANS_OUTDATED'


//posts
export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST'
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS'
export const DESTROY_POST_REQUEST = 'DESTROY_POST_REQUEST'
export const DESTROY_POST_SUCCESS = 'DESTROY_POST_SUCCESS'
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE'
export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST'
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS'
export const LIVE_UPDATE_POST_REQUEST = 'LIVE_UPDATE_POST_REQUEST'
export const LIVE_UPDATE_POST_SUCCESS = 'LIVE_UPDATE_POST_SUCCESS'
export const LIVE_UPDATE_POST_FAILURE = 'LIVE_UPDATE_POST_FAILURE'
export const PUBLISH_POST_REQUEST = 'PUBLISH_POST_REQUEST'
export const PUBLISH_POST_SUCCESS = 'PUBLISH_POST_SUCCESS'
export const SET_CURRENT_POST = 'SET_CURRENT_POST'
export const UPDATE_POST_REQUEST = 'UPDATE_POST_REQUEST'
export const UPDATE_POST_SUCCESS = 'UPDATE_POST_SUCCESS'

//postTemplates
export const CREATE_POST_TEMPLATE_REQUEST = 'CREATE_POST_TEMPLATE_REQUEST'
export const CREATE_POST_TEMPLATE_SUCCESS = 'CREATE_POST_TEMPLATE_SUCCESS'
export const DESTROY_POST_TEMPLATE_REQUEST = 'DESTROY_POST_TEMPLATE_REQUEST'
export const DESTROY_POST_TEMPLATE_SUCCESS = 'DESTROY_POST_TEMPLATE_SUCCESS'
export const FETCH_POST_TEMPLATE_FAILURE = 'FETCH_POST_TEMPLATE_FAILURE'
export const FETCH_POST_TEMPLATE_REQUEST = 'FETCH_POST_TEMPLATE_REQUEST'
export const FETCH_POST_TEMPLATE_SUCCESS = 'FETCH_POST_TEMPLATE_SUCCESS'
export const LIVE_UPDATE_POST_TEMPLATE_REQUEST = 'LIVE_UPDATE_POST_TEMPLATE_REQUEST'
export const LIVE_UPDATE_POST_TEMPLATE_SUCCESS = 'LIVE_UPDATE_POST_TEMPLATE_SUCCESS'
export const LIVE_UPDATE_POST_TEMPLATE_FAILURE = 'LIVE_UPDATE_POST_TEMPLATE_FAILURE'
export const PUBLISH_POST_TEMPLATE_REQUEST = 'PUBLISH_POST_TEMPLATE_REQUEST'
export const PUBLISH_POST_TEMPLATE_SUCCESS = 'PUBLISH_POST_TEMPLATE_SUCCESS'
export const SET_CURRENT_POST_TEMPLATE = 'SET_CURRENT_POST_TEMPLATE'
export const UPDATE_POST_TEMPLATE_REQUEST = 'UPDATE_POST_TEMPLATE_REQUEST'
export const UPDATE_POST_TEMPLATE_SUCCESS = 'UPDATE_POST_TEMPLATE_SUCCESS'

//providerAccounts
export const LINK_ACCOUNT_REQUEST = 'LINK_ACCOUNT_REQUEST'
export const LINK_ACCOUNT_SUCCESS = 'LINK_ACCOUNT_SUCCESS'
export const LOG_IN_WITH_PROVIDER = 'LOG_IN_WITH_PROVIDER'
export const LOG_IN_WITH_PROVIDER_SUCCESS = 'LOG_IN_WITH_PROVIDER_SUCCESS'
export const LOG_IN_WITH_PROVIDER_FAILURE = 'LOG_IN_WITH_PROVIDER_FAILURE'
export const FETCH_CURRENT_ACCOUNT_REQUEST = 'FETCH_CURRENT_ACCOUNT_REQUEST'
export const CREATE_FAKE_ACCOUNT_REQUEST = 'CREATE_FAKE_ACCOUNT_REQUEST'
export const CREATE_FAKE_ACCOUNT_SUCCESS = 'CREATE_FAKE_ACCOUNT_SUCCESS'

//TODO use PROVIDER_ACCOUNT
export const FETCH_PROVIDER_REQUEST = 'FETCH_PROVIDER_REQUEST'
export const FETCH_PROVIDER_SUCCESS = 'FETCH_PROVIDER_SUCCESS'
export const REFRESH_CHANNEL_TYPE_REQUEST = 'REFRESH_CHANNEL_TYPE_REQUEST'
export const REFRESH_CHANNEL_TYPE_SUCCESS = 'REFRESH_CHANNEL_TYPE_SUCCESS'
export const UPDATE_PROVIDER_FAILURE = 'UPDATE_PROVIDER_FAILURE'
export const UPDATE_PROVIDER_REQUEST = 'UPDATE_PROVIDER_REQUEST'
export const UPDATE_PROVIDER_SUCCESS = 'UPDATE_PROVIDER_SUCCESS'

//users
export const CHECK_USER_TOKEN = 'CHECK_USER_TOKEN'
export const CREATE_USER_WITH_EMAIL = 'CREATE_USER_WITH_EMAIL'
export const CURRENT_USER_OUTDATED = 'CURRENT_USER_OUTDATED'
export const FETCH_CURRENT_USER_REQUEST = 'FETCH_CURRENT_USER_REQUEST'
export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS'
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'
export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
export const RESET_PASSWORD_REQUEST = 'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const SET_IMAGE = 'SET_IMAGE'
export const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE'
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'
export const SIGN_OUT_REQUEST = 'SIGN_OUT_REQUEST'
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'

//viewSettings
export const SET_CURRENT_MODAL = 'SET_CURRENT_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const SET_VIEW_MODE = 'SET_VIEW_MODE'

//websites
export const FETCH_WEBSITE_REQUEST = 'FETCH_WEBSITE_REQUEST'
export const FETCH_WEBSITE_SUCCESS = 'FETCH_WEBSITE_SUCCESS'
export const REACTIVATE_OR_CREATE_WEBSITE_REQUEST = 'REACTIVATE_OR_CREATE_WEBSITE_REQUEST'
export const REACTIVATE_OR_CREATE_WEBSITE_SUCCESS = 'REACTIVATE_OR_CREATE_WEBSITE_SUCCESS'
export const SET_CURRENT_WEBSITE = 'SET_CURRENT_WEBSITE'
export const UPDATE_WEBSITE_REQUEST = 'UPDATE_WEBSITE_REQUEST'
export const UPDATE_WEBSITE_SUCCESS = 'UPDATE_WEBSITE_SUCCESS'

//workgroups
export const CREATE_WORKGROUP_REQUEST = 'CREATE_WORKGROUP_REQUEST'
export const CREATE_WORKGROUP_SUCCESS = 'CREATE_WORKGROUP_SUCCESS'
export const DESTROY_WORKGROUP_REQUEST = 'DESTROY_WORKGROUP_REQUEST'
export const DESTROY_WORKGROUP_SUCCESS = 'DESTROY_WORKGROUP_SUCCESS'
export const FETCH_WORKGROUP_FAILURE = 'FETCH_WORKGROUP_FAILURE'
export const FETCH_WORKGROUP_REQUEST = 'FETCH_WORKGROUP_REQUEST'
export const FETCH_WORKGROUP_SUCCESS = 'FETCH_WORKGROUP_SUCCESS'
export const SET_WORKGROUP = 'SET_WORKGROUP'
export const UPDATE_WORKGROUP_REQUEST = 'UPDATE_WORKGROUP_REQUEST'
export const UPDATE_WORKGROUP_SUCCESS = 'UPDATE_WORKGROUP_SUCCESS'
