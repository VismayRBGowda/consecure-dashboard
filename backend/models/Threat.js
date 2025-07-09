const mongoose = require("mongoose");

const threatSchema = new mongoose.Schema({
  threat_category: String,
  iocs: [String],
  threat_actor: String,
  attack_vector: String,
  location: String,
  forum_sentiment: Number,
  severity_score: Number,
  predicted_category: String,
  defense_mechanism: String,
  risk_level: Number,
  description: String,
  keywords: [String],
  named_entities: [String],
  topic_label: String,
  word_count: Number,
});


module.exports = mongoose.model('Threat', threatSchema);