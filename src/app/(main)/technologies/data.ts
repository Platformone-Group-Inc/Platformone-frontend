export const technologiesOption = {
  infrastructure: {
    options: [
      { value: "akamai", label: "Akamai" },
      { value: "apache", label: "Apache" },
      { value: "aws", label: "AWS" },
      { value: "aws-elb", label: "AWS ELB" },
      { value: "aws-route53", label: "AWS Route53" },
      { value: "azure", label: "Azure" },
      { value: "blob", label: "Blob" },
      { value: "cgi-federal", label: "CGI Federal" },
      { value: "checkpoint", label: "CheckPoint" },
      { value: "cisco", label: "Cisco" },
      { value: "cloudflare", label: "CloudFlare" },
      { value: "glacier", label: "Glacier" },
      { value: "google-dns", label: "Google DNS" },
      { value: "google-services", label: "Google Services" },
      { value: "ibm-cloud", label: "IBM Cloud" },
      { value: "iis", label: "IIS" },
      { value: "mircosoft-blob", label: "Mircosoft Blob" },
      { value: "openvpn", label: "OpenVpn" },
      { value: "oracle-service-cloud", label: "Oracle Service Cloud (OSvC)" },
      { value: "palo-alto", label: "Palo Alto" },
      { value: "s3", label: "S3" },
      { value: "squid", label: "Squid" },
      { value: "zscaler", label: "ZScaler" },
    ],
  },

  systems: {
    options: [
      { value: "ansible", label: "Ansible" },
      { value: "apparmor", label: "AppArmor" },
      { value: "chef", label: "Chef" },
      { value: "clamav", label: "ClamAV" },
      { value: "docker", label: "Docker" },
      { value: "jenkins", label: "Jenkins" },
      { value: "kubernetes", label: "Kubernetes" },
      { value: "mongodb", label: "MongoDB" },
      { value: "ossec", label: "OSSEC" },
      { value: "postgress", label: "Postgress" },
      { value: "rhel", label: "RHEL" },
      { value: "sql", label: "SQL" },
      { value: "symantec", label: "Symantec" },
      { value: "trend-micro", label: "Trend Micro" },
      {
        value: "trend-micro-deep-security",
        label: "Trend Micro Deep Security",
      },
      { value: "ubuntu", label: "Ubuntu" },
      { value: "win10", label: "Win10" },
    ],
  },

  "access-&-id": {
    options: [
      { value: "active-directory", label: "Active Directory" },
      { value: "aws-iam", label: "AWS IAM" },
      { value: "duo-security", label: "Duo Security" },
      { value: "entra-id", label: "Entra ID" },
      { value: "ms-authenticator", label: "MS Authenticator" },
      { value: "okta-idaas", label: "Okta IDaaS" },
      { value: "okta-verify", label: "Okta Verify" },
      { value: "saml-2-0", label: "SAML 2.0" },
      { value: "userid-pw", label: "UserID/PW" },
    ],
  },

  logging: {
    options: [
      { value: "and-kibana", label: "and Kibana (ELK)" },
      {
        value:
          "centralized-logs-collected-from-all-components-elastic-logstash",
        label:
          "Centralized logs collected from all components.  Elastic Logstash",
      },
      { value: "logstash", label: "Logstash" },
      { value: "splunk", label: "Splunk" },
      { value: "sumologic", label: "SumoLogic" },
    ],
  },

  monitoring: {
    options: [
      { value: "new-relic", label: "New Relic" },
      { value: "ossec-integrity-module", label: "OSSEC Integrity Module" },
      {
        value: "trend-micro-integrity-module",
        label: "Trend Micro Integrity Module",
      },
    ],
  },

  scanning: {
    options: [
      { value: "jira", label: "Jira" },
      { value: "qualys", label: "Qualys" },
      { value: "salesforce", label: "SalesForce" },
      { value: "servicenow", label: "ServiceNow" },
      { value: "tenable-nessus", label: "Tenable Nessus" },
    ],
  },

  sdlc: {
    options: [
      { value: "burpsuite", label: "BurpSuite" },
      { value: "github", label: "GitHub" },
      { value: "gitlab", label: "GitLab" },
      { value: "jenkins", label: "Jenkins" },
      { value: "qualys", label: "Qualys" },
      { value: "sonarqube", label: "SonarQube" },
      { value: "veracode", label: "Veracode" },
    ],
  },

  "corp-systems": {
    options: [
      { value: "bitdefender", label: "Bitdefender" },
      { value: "ediscovery", label: "ediscovery" },
      { value: "filevault", label: "FileVault" },
      { value: "google-workspace-drive", label: "Google Workspace Drive" },
      { value: "google-workspace-mail", label: "Google Workspace Mail" },
      { value: "jira", label: "Jira" },
      { value: "know4me", label: "Know4me" },
      { value: "office-365", label: "Office 365" },
      { value: "office-365-onedrive", label: "Office 365 OneDrive" },
      { value: "on-prem-exchange", label: "On-Prem Exchange" },
      { value: "salesforce", label: "SalesForce" },
      { value: "servicenow", label: "ServiceNow" },
      { value: "slack", label: "Slack" },
      { value: "symantec", label: "Symantec" },
      {
        value: "trend-micro-deep-security",
        label: "Trend Micro Deep Security",
      },
    ],
  },
};
