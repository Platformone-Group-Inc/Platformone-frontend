export const technologiesOption = [
  {
    id: "infrastructure",
    label: "Infrastructure",
    items: [
      {
        value: "infrastructure-as-a-service-iaas-or-csp-managed",
        label: "Infrastructure as a Service (IaaS) or CSP-managed?",
        options: [
          { value: "AWS", label: "AWS" },
          { value: "Azure", label: "Azure" },
          { value: "Google Services", label: "Google Services" },
          { value: "CGI Federal", label: "CGI Federal" },
          { value: "IBM Cloud", label: "IBM Cloud" },
          {
            value: "Oracle Service Cloud (OSvC)",
            label: "Oracle Service Cloud (OSvC)",
          },
        ],
      },
      {
        value: "dns-dnssec",
        label: "DNS/DNSSEC",
        options: [
          { value: "AWS Route53", label: "AWS Route53" },
          { value: "Akamai", label: "Akamai" },
          { value: "Google DNS", label: "Google DNS" },
        ],
      },
      {
        value: "firewalls-waf",
        label: "Firewalls/WAF",
        options: [
          { value: "Akamai", label: "Akamai" },
          { value: "Palo Alto", label: "Palo Alto" },
          { value: "CloudFlare", label: "CloudFlare" },
          { value: "ZScaler", label: "ZScaler" },
          { value: "CheckPoint", label: "CheckPoint" },
        ],
      },
      {
        value: "proxy-servers",
        label: "Proxy Servers",
        options: [{ value: "Squid", label: "Squid" }],
      },
      {
        value: "vpns",
        label: "VPNs",
        options: [
          { value: "Palo Alto", label: "Palo Alto" },
          { value: "Google Services", label: "Google Services" },
          { value: "ZScaler", label: "ZScaler" },
          { value: "Cisco", label: "Cisco" },
          { value: "CloudFlare", label: "CloudFlare" },
          { value: "OpenVpn", label: "OpenVpn" },
        ],
      },{
        value: "Load Balancer",
        label: "Load Balancer",
        options: [
          { value: "AWS ELB", label: "AWS ELB" },
          { value: "Mircosoft Blob", label: "Mircosoft Blob" },
        
        ],
 

      },
      {
        value: "Web Application Server(s)",
        label: "Web Application Server(s)",
        options: [
          { value: "IIS", label: "IIS" },
          { value: "Apache", label: "Apache" },
        ],
 

      },{
        value: "Storage",
        label: "Storage",
        options: [
          { value: "S3", label: "S3" },
          { value: "Glacier", label: "Glacier" },
           {value: "Blob", label: "Blob" }
   
        ],
 

      },
    ],
  },
  {
    id: "systems",
    label: "Systems",
    items: [
      {
        value:
          "operating-system-s-what-os-is-used-across-the-entire-fedramp-environment-if-more-than-one-list-all",
        label: "Operating System(s)",
        description:
          "What OS is used across the entire FedRAMP environment? If more than one, list all.",
        options: [
          { value: "RHEL", label: "RHEL" },
          { value: "Win10", label: "Win10" },
          { value: "Ubuntu", label: "Ubuntu" },
        ],
      },
      {
        value:
          "database-s-what-dbs-and-versions-are-in-use-if-more-than-one-list-all",
        label: "Database(s)",
        description:
          "What DBs & versions are in use? If more than one, list all.",
        options: [
          { value: "MongoDB", label: "MongoDB" },
          { value: "SQL", label: "SQL" },
          { value: "Postgress", label: "Postgress" },
        ],
      },
      {
        value:
          "anti-virus-anti-malware-what-is-used-on-all-components-in-fedramp-environment",
        label: "Anti-Virus/Anti-Malware",
        description: "What is used on all components in FedRAMP environment?",
        options: [
          {
            value: "Trend Micro Deep Security",
            label: "Trend Micro Deep Security",
          },
          { value: "Symantec", label: "Symantec" },
          { value: "ClamAV", label: "ClamAV" },
        ],
      },
      {
        value:
          "host-based-intrusion-detection-what-is-used-on-all-components-in-fedramp-environment",
        label: "Host-Based Intrusion Detection",
        description: "What is used on all components in FedRAMP environment?",
        options: [
          {
            value: "Trend Micro Deep Security",
            label: "Trend Micro Deep Security",
          },
          { value: "Symantec", label: "Symantec" },
          { value: "OSSEC", label: "OSSEC" },
        ],
      },
      {
        value:
          "program-execution-tool-is-a-tool-in-place-to-prevent-unathorized-program-execution",
        label: "Program Execution Tool",
        description:
          "Is a tool in place to prevent unauthorized program execution?",
        options: [
          { value: "AppArmor", label: "AppArmor" },
          { value: "Symantec", label: "Symantec" },
          { value: "Trend Micro", label: "Trend Micro" },
        ],
      },
      {
        value: "Configuration Management",
        label: "Configuration Management",
        description: "What is used?",
        options: [
          { value: "Ansible", label: "Ansible" },
          { value: "Chef", label: "Chef" },
          { value: "Jenkins", label: "Jenkins" }
        ],
      },
       {
        value: "Containerized Environment Management",
        label: "Containerized Environment Management",
        description: "What is used?",
        options: [
          { value: "Docker", label: "Docker" },
          { value: "Kubernetes", label: "Kubernetes" },
        ],
      }
    ],
  },
  {
    id: "Access & ID",
    label: "Access & ID",
    items: [
      {
        value: "Identity Management",
        label: "Identity Management",
        options: [
          { value: "Okta", label: "Okta" },
          { value: "IDaaS", label: "IDaaS" },
          { value: "Active Directory", label: "Active Directory" },
          { value: "Entra ID", label: "Entra ID" },
          { value: "AWS IAM", label: "AWS IAM" },


        ],
      },
      {
        value: "Multi-Factor Authentication (MFA)",
        label: "Multi-Factor Authentication (MFA)",
        options: [
          { value: "Okta Verify", label: "Okta Verify" },
          { value: "MS Authenticator", label: "MS Authenticator" },
          { value: "Duo Security", label: "Duo Security" },
          { value: "SAML 2.0", label: "SAML 2.0" },


        ],
      },
      {
        value: "Customer Authentication",
        label: "Customer Authentication",
        options: [
          { value: "UserID/PW", label: "UserID/PW" },
          { value: "SAML 2.0", label: "SAML 2.0" },



        ],
      }
    ],
  },
  {
    id: "logging",
    label: "Logging",
    items: [
      {
        value: "log-management",
        label: "Log Management",
        options: [
          { value: "Splunk", label: "Splunk" },
          { value: "SumoLogic", label: "SumoLogic" },
          { value: "Logstash", label: "Logstash" },
          { value: "and Kibana (ELK)", label: "and Kibana (ELK)" },
        ],
      },
      {
        value: "Security Information and Event Management (SIEM)",
        label: "Security Information and Event Management (SIEM)",
        options: [{ value: "elastic-logstash", label: "Elastic Logstash" }, {
          value: "Splunk",
          label: "Splunk",
        }],

      },
    ],
  },
  {
    id: "monitoring",
    label: "Monitoring",
    items: [
      {
        value: "System Monitoring & Maintenance Tools",
        label: "System Monitoring & Maintenance Tools",
        options: [{ value: "New Relic", label: "New Relic" }],
      },
      {
        value: "Performance Monitoring",
        label: "Performance Monitoring",
        options: [{ value: "New Relic", label: "New Relic" }],
      },
      {
        value: "File Integrity Monitoring",
        label: "File Integrity Monitoring",
        options: [{ value: "OSSEC Integrity Module", label: "OSSEC Integrity Module" }, {
          value: "Trend Micro Integrity Module",
          label: "Trend Micro Integrity Module"
        }],
      }
    ],
  },
  {
    id: "scanning",
    label: "Scanning",
    items: [
      {
        value: "Scanning - Operating System & Infrastructure",
        label: "Scanning - Operating System & Infrastructure",
        options: [
          { value: "Tenable Nessus", label: "Tenable Nessus" }
        ],
      }, {
        value: "Scanning - Dynamic Web Application scans",
        label: "Scanning - Dynamic Web Application scans",
        options: [
          { value: "BurpSuite", label: "BurpSuite" }
        ],
      }, {
        value: "Scanning - Database Vulnerability scans",
        label: "Scanning - Database Vulnerability scans",
        options: [
          { value: "Qualys", label: "Qualys" }
        ],
      }, {
        value: "Vulnerability Tracking/Management",
        label: "Vulnerability Tracking/Management",
        options: [
          { value: "Veracode", label: "Veracode" },
          { value: "SalesForce", label: "SalesForce" },
          { value: "ServiceNow", label: "ServiceNow" },
          { value: "Jira", label: "Jira" }


        ],
      }


    ],
  },
  {
    id: "sdlc",
    label: "SDLC",
    items: [
      {
        value: "Source Code - Repository & Version Control",
        label: "Source Code - Repository & Version Control",
        options: [
          { value: "GitHub", label: "GitHub" },
          { value: "GitLab", label: "GitLab" },
        ],
      },
      {
        value: "Analysis - Static Code",
        label: "Analysis - Static Code",
        options: [{ value: "SonarQube", label: "SonarQube" }, { value: "Veracode", label: "Veracode" }],

      },
      {
        value: "Analysis - Dynamic Code",
        label: "Analysis - Dynamic Code",
        options: [
          { value: "Qualys", label: "Qualys" },
          { value: "BurpSuite", label: "BurpSuite" }

        ],
      },
      {
        value: "Source Code - Deployment / Deployment Automation",
        label: "Source Code - Deployment / Deployment Automation",
        options: [{ value: "Jenkins", label: "Jenkins" }],
      },
    ],
  },
  {
    id: "corp-systems",
    label: "Corp Systems",
    items: [
      {
        value:
          "Ticketing System",
        label: "Ticketing System",
        description:
          "What ticketing system is used for Customer Care, IT Change Mgmt, and Incident Mgmt?",
        options: [
          { value: "salesforce", label: "SalesForce" },
          { value: "servicenow", label: "ServiceNow" },
          { value: "jira", label: "Jira" },
        ],
      },
      {
        value:
          "Anti-Virus/Anti-Malware (centralized)",
        label:
          "Anti-Virus/Anti-Malware (centralized)",
        options: [
          {
            value: "trend-micro-deep-security",
            label: "Trend Micro Deep Security",
          },
          { value: "Trend Micro Deep Security", label: "Trend Micro Deep Security" },
          { value: "Symantec", label: "Symantec" }
        ],
      },


      {
        value: "Email, Other Communications",
        label: "Email, Other Communications",
        options: [
          { value: "Google Workspace Mail", label: "Google Workspace Mail" },
          { value: "Office 365", label: "Office 365" },
          { value: "On-Prem Exchange", label: "On-Prem Exchange" },
          { value: "Slack", label: "Slack" },
        ],

      },
      {
        value: "Document Storage / Document Sharing",
        label: "Document Storage / Document Sharing",
        options: [
          { value: "Google Workspace Drive", label: "Google Workspace Drive" },
          { value: "Office 365 OneDrive", label: "Office 365 OneDrive" },
        ],
      },
      {
        value: "Laptop Encryption Tools",
        label: "Laptop Encryption Tools",
        options: [
          { value: "FileVault", label: "FileVault" },
          { value: "Bitdefender", label: "Bitdefender" },
        ],
      },
      {
        value: "Electronic Discovery (eDiscovery)",
        label:
          "Electronic Discovery (eDiscovery)",
        options: [{ value: "ediscovery", label: "ediscovery" }],
      },
      {
        value: "Learning Management",
        label: "Learning Management",
        description:
          "What tool(s) are used for delivering / tracking Security Awareness Training?",
        options: [{ value: "Know4me", label: "Know4me" }],
      },
    ],
  },
];