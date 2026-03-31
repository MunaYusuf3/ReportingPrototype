// Shared helpers and config used across the reporting flow 

export const formatReason = (value) => {
    const labels = {
      harassment_or_bullying: "Harassment or bullying",
      hate_or_discrimination: "Hate or discrimination",
      threats_or_intimidation: "Threats or intimidation",
      misinformation: "False or misleading information",
      scams_or_impersonation: "Scams or impersonation",
      sexual_content: "Sexual abuse or exploitation",
      soft_report: "Flagged for review",
      something_else: "Other",
    };
    return labels[value] || value;
  };
  

  export const formatAffected = (value) => {
    const labels = {
      me: "This targets me",
      someone_else: "This targets someone else",
      prefer_not_to_say: "Prefer not to say",
      "": "Not provided",
    };
    return labels[value] || value;
  };
  
  export const formatPattern = (value) => {
    const labels = {
      once: "This happened once",
      repeated: "This is repeated behaviour",
      "": "Not provided",
    };
    return labels[value] || value;
  };
  

  export const API_BASE = "http://127.0.0.1:8000";
  