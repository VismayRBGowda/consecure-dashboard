const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Threat = require('../models/Threat')

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser : true,
    useUnifiedTopology : true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.error("Unable to connect to MongoDB : ", err));

const results = [];

fs.createReadStream(path.join(__dirname, '../../data/threats.csv'))
    .pipe(csv())
    .on('data', (row) => {
        results.push({
            threat_category: row['Threat Category'],
            iocs: parseArray(row['IOCs (Indicators of Compromise)']),
            threat_actor: row['Threat Actor'],
            attack_vector: row['Attack Vector'],
            location: row['Geographical Location'],
            forum_sentiment: parseFloat(row['Sentiment in Forums']),
            severity_score: parseInt(row['Severity Score']),
            predicted_category: row['Predicted Threat Category'],
            defense_mechanism: row['Suggested Defense Mechanism'],
            risk_level: parseInt(row['Risk Level Prediction']),
            description: row['Cleaned Threat Description'],
            keywords: parseArray(row['Keyword Extraction']),
            named_entities: parseArray(row['Named Entities (NER)']),
            topic_label: row['Topic Modeling Labels'],
            word_count: parseInt(row['Word Count'])
        });
    })
    .on('end', async() => {
        console.log(`Inserting ${results.length} rows...`);
        try{
            await Threat.insertMany(results);
            console.log('Data Successfully ingested')
        }
        catch(err){
            console.error("Error during ingestion : ", err);
        }
        finally{
            mongoose.disconnect();
        }
    });

function parseArray(str) {
  try {
    return JSON.parse(str.replace(/'/g, '"'));
  } catch {
    return [];
  }
}