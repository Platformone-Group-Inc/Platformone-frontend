export const technologiesOption = [
  {
    id: "infrastructure",
    label: "Infrastructure",
    items: [
      {
        value: "infrastructure-as-a-service-iaas-or-csp-managed",
        label: "Infrastructure as a Service (IaaS) or CSP‑managed?",
        options: [
          { value: "aws", label: "AWS" },
          { value: "azure", label: "Azure" },
          { value: "google-services", label: "Google Services" },
          { value: "cgi-federal", label: "CGI Federal" },
          { value: "ibm-cloud", label: "IBM Cloud" },
          {
            value: "oracle-service-cloud-osvc",
            label: "Oracle Service Cloud (OSvC)",
          },
        ],
      },
      {
        value: "dns-dnssec",
        label: "DNS/DNSSEC",
        options: [
          { value: "aws-route53", label: "AWS Route53" },
          { value: "akamai", label: "Akamai" },
          { value: "google-dns", label: "Google DNS" },
        ],
      },
      {
        value: "firewalls-waf",
        label: "Firewalls/WAF",
        options: [
          { value: "akamai", label: "Akamai" },
          { value: "palo-alto", label: "Palo Alto" },
          { value: "cloudflare", label: "CloudFlare" },
          { value: "zscaler", label: "ZScaler" },
          { value: "checkpoint", label: "CheckPoint" },
        ],
      },
      {
        value: "proxy-servers",
        label: "Proxy Servers",
        options: [{ value: "squid", label: "Squid" }],
      },
      {
        value: "vpns",
        label: "VPNs",
        options: [
          { value: "palo-alto", label: "Palo Alto" },
          { value: "google-services", label: "Google Services" },
          { value: "zscaler", label: "ZScaler" },
          { value: "cisco", label: "Cisco" },
          { value: "cloudflare", label: "CloudFlare" },
          { value: "openvpn", label: "OpenVpn" },
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
          { value: "rhel", label: "RHEL" },
          { value: "win10", label: "Win10" },
          { value: "ubuntu", label: "Ubuntu" },
        ],
      },
      {
        value:
          "database-s-what-dbs-and-versions-are-in-use-if-more-than-one-list-all",
        label: "Database(s)",
        description:
          "What DBs & versions are in use? If more than one, list all.",
        options: [
          { value: "mongodb", label: "MongoDB" },
          { value: "sql", label: "SQL" },
          { value: "postgress", label: "Postgress" },
        ],
      },
      {
        value:
          "anti-virus-anti-malware-what-is-used-on-all-components-in-fedramp-environment",
        label: "Anti-Virus/Anti-Malware",
        description: "What is used on all components in FedRAMP environment?",
        options: [
          {
            value: "trend-micro-deep-security",
            label: "Trend Micro Deep Security",
          },
          { value: "symantec", label: "Symantec" },
          { value: "clamav", label: "ClamAV" },
        ],
      },
      {
        value:
          "host-based-intrusion-detection-what-is-used-on-all-components-in-fedramp-environment",
        label: "Host-Based Intrusion Detection",
        description: "What is used on all components in FedRAMP environment?",
        options: [
          {
            value: "trend-micro-deep-security",
            label: "Trend Micro Deep Security",
          },
          { value: "symantec", label: "Symantec" },
          { value: "ossec", label: "OSSEC" },
        ],
      },
      {
        value:
          "program-execution-tool-is-a-tool-in-place-to-prevent-unathorized-program-execution",
        label: "Program Execution Tool",
        description:
          "Is a tool in place to prevent unauthorized program execution?",
        options: [
          { value: "apparmor", label: "AppArmor" },
          { value: "symantec", label: "Symantec" },
          { value: "trend-micro", label: "Trend Micro" },
        ],
      },
      {
        value: "configuration-management-what-is-used",
        label: "Configuration Management",
        description: "What is used?",
        options: [
          { value: "ansible", label: "Ansible" },
          { value: "chef", label: "Chef" },
          { value: "jenkins", label: "Jenkins" },
          { value: "docker", label: "Docker" },
          { value: "kubernetes", label: "Kubernetes" },
        ],
      },
    ],
  },
  {
    id: "access-and-id",
    label: "Access & ID",
    items: [
      {
        value: "iam-identity-management",
        label: "IAM / Identity Management",
        options: [
          { value: "active-directory", label: "Active Directory" },
          { value: "aws-iam", label: "AWS IAM" },
          { value: "okta-idaas", label: "Okta IDaaS" },
          { value: "duo-security", label: "Duo Security" },
          { value: "entra-id", label: "Entra ID" },
          { value: "userid-pw", label: "UserID/PW" },
        ],
      },
      {
        value: "mfa",
        label: "MFA",
        options: [
          { value: "okta-verify", label: "Okta Verify" },
          { value: "ms-authenticator", label: "MS Authenticator" },
          { value: "duo-security", label: "Duo Security" },
          { value: "saml-2-0", label: "SAML 2.0" },
        ],
      },
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
          { value: "splunk", label: "Splunk" },
          { value: "sumologic", label: "SumoLogic" },
          { value: "logstash", label: "Logstash" },
          { value: "and-kibana", label: "and Kibana (ELK)" },
        ],
      },
      {
        value: "centralized-logs",
        label: "Centralized Logs collected from all components",
        options: [{ value: "elastic-logstash", label: "Elastic Logstash" }],
      },
    ],
  },
  {
    id: "monitoring",
    label: "Monitoring",
    items: [
      {
        value: "new-relic",
        label: "Performance & Availability",
        options: [{ value: "new-relic", label: "New Relic" }],
      },
      {
        value: "integrity-monitoring",
        label: "Integrity Monitoring",
        options: [
          { value: "ossec-integrity-module", label: "OSSEC Integrity Module" },
          {
            value: "trend-micro-integrity-module",
            label: "Trend Micro Integrity Module",
          },
        ],
      },
    ],
  },
  {
    id: "scanning",
    label: "Scanning",
    items: [
      {
        value: "vulnerability-scanning",
        label: "Vulnerability Scanning",
        options: [
          { value: "qualys", label: "Qualys" },
          { value: "tenable-nessus", label: "Tenable Nessus" },
        ],
      },
      {
        value: "ticketing-integrations",
        label: "Ticketing Integrations",
        options: [
          { value: "servicenow", label: "ServiceNow" },
          { value: "jira", label: "Jira" },
          { value: "salesforce", label: "SalesForce" },
        ],
      },
    ],
  },
  {
    id: "sdlc",
    label: "SDLC",
    items: [
      {
        value: "code-repository",
        label: "Code Repository",
        options: [
          { value: "github", label: "GitHub" },
          { value: "gitlab", label: "GitLab" },
        ],
      },
      {
        value: "ci-cd",
        label: "CI/CD",
        options: [{ value: "jenkins", label: "Jenkins" }],
      },
      {
        value: "static-code-analysis",
        label: "Static Code Analysis",
        options: [
          { value: "sonarqube", label: "SonarQube" },
          { value: "veracode", label: "Veracode" },
          { value: "burpsuite", label: "BurpSuite" },
        ],
      },
      {
        value: "vulnerability-scanning",
        label: "Vulnerability Scanning",
        options: [{ value: "qualys", label: "Qualys" }],
      },
    ],
  },
  {
    id: "corp-systems",
    label: "Corp Systems",
    items: [
      {
        value:
          "ticketing-system-what-ticketing-system-is-used-for-customer-care-it-change-mgmt-and-incident-mgmt",
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
          "anti-virus-anti-malware-centralized-used-on-user-systems-end-points",
        label:
          "Anti-Virus/Anti-Malware (centralized) - Used on User Systems/End Points",
        options: [
          {
            value: "trend-micro-deep-security",
            label: "Trend Micro Deep Security",
          },
          { value: "symantec", label: "Symantec" },
        ],
      },
      {
        value: "email-other-communications",
        label: "Email, Other Communications",
        options: [
          { value: "google-workspace-mail", label: "Google Workspace Mail" },
          { value: "office-365", label: "Office 365" },
          { value: "on-prem-exchange", label: "On-Prem Exchange" },
          { value: "slack", label: "Slack" },
        ],
      },
      {
        value: "document-storage-document-sharing",
        label: "Document Storage / Document Sharing",
        options: [
          { value: "google-workspace-drive", label: "Google Workspace Drive" },
          { value: "office-365-onedrive", label: "Office 365 OneDrive" },
        ],
      },
      {
        value: "laptop-encryption-tools",
        label: "Laptop Encryption Tools",
        options: [
          { value: "filevault", label: "FileVault" },
          { value: "bitdefender", label: "Bitdefender" },
        ],
      },
      {
        value: "electronic-discovery-legal-hold",
        label:
          "Electronic Discovery (eDiscovery) or placing document/files under legal hold",
        options: [{ value: "ediscovery", label: "ediscovery" }],
      },
      {
        value: "security-awareness-training",
        label: "Learning Management",
        description:
          "What tool(s) are used for delivering / tracking Security Awareness Training?",
        options: [{ value: "know4me", label: "Know4me" }],
      },
    ],
  },
];
