/**
 * Rule-based AI logic for Employee Performance and Risk Analysis
 */

const analyzeEmployee = (employee) => {
  const { performanceRating: rating, attendancePercentage: attendance, salary } = employee;

  // A. Performance Analysis
  let performanceStatus = "Poor Performer";
  if (rating >= 4 && attendance >= 80) {
    performanceStatus = "Good Performer";
  } else if (rating >= 3) {
    performanceStatus = "Average Performer";
  }

  // B. Promotion Suggestion
  let promotionStatus = "Needs Improvement";
  if (rating >= 4 && attendance >= 85) {
    promotionStatus = "Eligible for Promotion";
  }

  // C. Risk Detection
  let riskLevel = "Low Risk";
  if (rating <= 2 && attendance < 60 && salary < 300000) { // Adjusted salary threshold for Indian Context (3L instead of 30k)
    riskLevel = "High Risk";
  } else if (rating <= 3) {
    riskLevel = "Medium Risk";
  }

  // D. Recommendation System
  let recommendation = "Maintain Performance";
  if (performanceStatus === "Poor Performer") {
    recommendation = "Provide Training";
  } else if (promotionStatus === "Eligible for Promotion") {
    recommendation = "Consider Salary Hike";
  }

  return {
    performanceStatus,
    promotionStatus,
    riskLevel,
    recommendation
  };
};

module.exports = { analyzeEmployee };
