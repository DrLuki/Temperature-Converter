const celsiusEl = document.getElementById("celsiusId");
const kelvinEl = document.getElementById("kelvinId");
const fahrenheitEl = document.getElementById("fahrenheitId");

//footer
var today = new Date();
today = today.getFullYear();
$('.year').text(today);

//multilanguage

 // Function to fetch language data
 async function fetchLanguageData(lang) {
    const response = await fetch(`languages/${lang}.json`);
    return response.json();
  }
  
  // Function to set the language preference
  function setLanguagePreference(lang) {
    localStorage.setItem('language', lang);
    location.reload();
  }
  
  // Function to update content based on selected language
  function updateContent(langData) {
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = langData[key];
    });
  }
  
  // Function to change language
  async function changeLanguage(lang) {
    await setLanguagePreference(lang);
    
    const langData = await fetchLanguageData(lang);
    updateContent(langData);
  }

  // Call updateContent() on page load
  window.addEventListener('DOMContentLoaded', async () => {
    const userPreferredLanguage = localStorage.getItem('language') || 'en';
    const langData = await fetchLanguageData(userPreferredLanguage);
    updateContent(langData);
  });

//converter
function computeTemp(event) {
    const currentValue = +event.target.value;

    switch (event.target.name) {
        case "celsius":
            kelvinEl.value = (currentValue + 273.15).toFixed(3);
            fahrenheitEl.value = (currentValue * 1.8 + 32).toFixed(3);
            break;

        case "fahrenheit":
            celsiusEl.value = ((currentValue - 32) / 1.8).toFixed(3);
            kelvinEl.value = ((currentValue - 32) / 1.8 + 273.15).toFixed(3);
            break;

        case "kelvin":
            celsiusEl.value = (currentValue - 273.15).toFixed(3);
            fahrenheitEl.value = ((currentValue - 273.15) * 1.8 + 32).toFixed(3);
            break;


    }
}

