// Social contants
// using module.exports so can either import or require (front end server only uses require)
//keep this in sync with backend constants


module.exports = {
  PLAN_STATUSES: [
    "DRAFT",
    "ACTIVE",
    "ARCHIVED"
  ],
  PROVIDER_STATUSES: [
    "ACTIVE",
    "ARCHIVED"
  ],
  POST_STATUSES: [
    "DRAFT",
    "PUBLISHED",
    "ARCHIVED"
  ],

  //possible postingAsTypes requirements:
  // NO_PHOTO:
  // no posting photos allowed
  //
  // ROLES:
  //
  // array of roles that are allowed to create
  // all in array are required (to keep consistent with requiredScopes)
  // (could potentially separate requirement, POSSIBLE_ROLES if want to do any in list are allowed to post)

  //all possible providers that can be in the provider column
  PROVIDERS: {
    FACEBOOK: {
      name: 'Facebook',
      providerId: 'FACEBOOK',
      channelTypes: {
        PERSONAL_POST: {
          name: "Personal",
          requiredScopes: ["publish_actions"],
          hasMultiple: false, //if there are a list of channels for this channelType
          maxImages: 4,
          maxCharacters: 63206,
        },
        //PRIVATE_MESSAGE: [probably friends, ],
        GROUP_POST: {
          name: "Group",
          requiredScopes: ["publish_actions", "user_managed_groups"],
          hasMultiple: true,
          maxImages: 4,
          maxCharacters: 63206,
        },
        PAGE_POST: {
          name: "Page",
          requiredScopes: ["manage_pages", "publish_pages", "pages_show_list"], //mostly for businesses
          hasMultiple: true,
          maxImages: 4,
          maxCharacters: 63206 ,
          //only putting this prop in constant if there's more than one type for now
          postingAsTypes: { //jq said we'd never need
            /*SELF: {
              label: "Yourself",
              requirements: {
                "NO_PHOTO": true, // TODO might just post photo on
              }
            },*/
            PAGE: {
              label: "Page",
              requirements: {
                "ROLES": [
                  "CREATE_CONTENT",
                ]
              }
            },
          }
        },
        //"DARK_POST",
        //"BUSINESS_MESSAGE",
      },
    },
    //GITHUB: 'github',
    GOOGLE: {
      name: 'Google',
      providerId: 'GOOGLE',
      notForPublishing: true, //can still publish if they create channels on this though, using the custom channel builder
      channelTypes: [],
    },
    LINKEDIN: {
      name: 'LinkedIn',
      providerId: 'LINKEDIN',
      channelTypes: {
        PERSONAL_POST: {
          name: "Personal",
          requiredScopes: ['w_share'],
          hasMultiple: false,
          maxImages: 1,
          maxCharacters: 500,
        },
        //PRIVATE_MESSAGE: [probably friends, ],
        //GROUP_POST: ['w_share'], discontinued: https://www.linkedin.com/help/linkedin/answer/81635/groups-api-no-longer-available?lang=en
        PAGE_POST: {
          name: "Company Page",
          requiredScopes: ['rw_company_admin'], //mostly for businesses https://developer.linkedin.com/docs/company-pages. Watch out, will want to check page settings to see if they have permitted it in their linkedIn accoutn
          hasMultiple: true,
          maxImages: 1,
          maxCharacters: 700,
        },
      }
    },
    TWITTER: {
      name: 'Twitter',
      providerId: 'TWITTER',
      channelTypes: {
        PERSONAL_POST: {
          name: "Personal",
          requiredScopes: [],//tweet. distinct from business post?
          hasMultiple: false,
          maxImages: 4,
          maxCharacters: 280,
        },
        //PRIVATE_MESSAGE:,, TODO want to support soon
        //  requiredScopes: [],//probably friends, ]
        //  hasMultiple: true,
        //  maxImages: 1,
        //  maxCharacters: 100*1000,
      },
    },
    /*
    GOOGLE: {
      name: 'Google+',
      unsupported: true,
      providerId: 'GOOGLE',
      channelTypes: {
      },
    },
    */
  },
  PROVIDER_SUGGESTION_LIST: [
    "Reddit",
    "Slack",
    "Voat",
    "Quora",
    "Pinterest",
    "GrowthHackers.com",
    "Inbound.org",
    "Instagram",
    "Google Plus",
    "Snapchat",
    "Facebook",
    "Twitter",
    "LinkedIn",
  ]
}
      //keep this in sync with the frontend constants

