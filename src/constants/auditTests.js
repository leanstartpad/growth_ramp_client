export const AUDIT_TESTS = {
  pageSpeed: {
    key: "pageSpeed",
    question: "Which of your pages are too slow and need to be fixed?",
    lists: {
      slowPages: {
        header: "Slow Pages",
        metrics: {
          "ga:avgPageLoadTime": {},
          "ga:pageviews": {},
        }
      }
    },
  },

  // not using yet
  /*
  wellBalancedPortfolio: {
    key: "wellBalancedPortfolio",
    question: "Is your acquisition portfolio well-balanced?",
  },

  keywordTargets: {
    key: "keywordTargets",
    question: "What keyword should the page target?",
  },

  */
  headlineStrength: {
    key: "headlineStrength",
    question: "What headlines need to be improved?",
    lists: {
      weakHeadlines: {
        header: "Headlines to improve:",
        metrics: {
          "clicks": {},
          "ctr": {},
          "impressions": {},
          "position": {},
        }
      }
    },
  },

  browserCompatibility: {
    key: "browserCompatibility",
    question: "What browsers does your site not work well on?",
  },

  deviceCompatibility: {
    key: "deviceCompatibility",
    question: "What devices does your site not work well on?",
  },

  userInteraction: {
    key: "userInteraction",
    question: "What other pages may have issues that need fixed?",
  },
  pageValue: {
    key: "pageValue",
    question: "What content adds the most value to an ultimate outcome for your website? What pages should you repurpose and syndicate?",
  },
  searchPositionToImprove: {
    key: "searchPositionToImprove",
    question: "What pages should you focus on improving the search position?",
  },
}
