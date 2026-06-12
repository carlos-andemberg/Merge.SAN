require('dotenv').config();
const fetch = require('node-fetch');
const key = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

async function checkModels() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
    const data = await response.json();
    if (data.models) {
      console.log(data.models.map(m => m.name).join('\n'));
    } else {
      console.log(data);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

checkModels();
