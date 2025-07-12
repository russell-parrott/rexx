function sanitizeInput(review) {
  const blockedPatterns = [
    new RegExp("ignore.*instruction", "gi"),
    new RegExp("respond.*with", "gi"),
    new RegExp("<script.*?>.*?<\/script>", "gi"),
    new RegExp("(require|eval)\(.*?\)", "gi"),
    new RegExp('[\"`{}\\]', "g"),
    new RegExp("\b(asdf|lorem|qwerty)\b", "gi"),
    new RegExp("\n{2,}", "g")
  ];

  let cleanReview = review.trim();
  blockedPatterns.forEach((pattern) => {
    cleanReview = cleanReview.replace(pattern, "[REDACTED]");
  });

  return cleanReview;
}

module.exports = { sanitizeInput };
