
const options = { timeZone: 'America/New_York', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
const newYorkTime = new Date().toLocaleTimeString('en-US', options);
console.log("Current time in New York:", newYorkTime);

function updateNewYorkTime() {
    const timeElement = document.getElementById("ny-time");
    if (timeElement) {
        timeElement.textContent = getNewYorkTime();
    }
}

// Mettre à jour toutes les secondes
setInterval(updateNewYorkTime, 1000);

// Affichage initial dès le chargement de la page
document.addEventListener("DOMContentLoaded", updateNewYorkTime);

function fetchRecommendations() {
    const apiUrl = "https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-JS0101EN-SkillsNetwork/travel1.json";
// Remplace par l'URL de ton API

fetch(apiUrl)
.then(response => response.json())
.then(data => {
    console.log("Données reçues :", data); // Vérifier ce que l'API retourne
    displayRecommendations(data.places); 
})
.catch(error => console.error("Erreur lors de la récupération :", error));

}


async function fetchRecommendations() {
    const apiUrl = "https://cf-courses-data.s3.us.cloud-object-storage.appdomain.cloud/IBMSkillsNetwork-JS0101EN-SkillsNetwork/travel1.json";

    try {
        console.log("📡 Tentative de connexion à l'API...");
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`Erreur HTTP! Statut: ${response.status}`);
        }

        const data = await response.json();
        console.log("✅ Réponse API reçue :", data);

        // Extraire les villes des pays
        let cities = [];
        data.countries.forEach(country => {
            if (country.cities && Array.isArray(country.cities)) {
                cities = cities.concat(country.cities);
            }
        });

        // Fusionner villes, temples et plages en un seul tableau
        const allPlaces = [...cities, ...data.temples, ...data.beaches];

        if (allPlaces.length === 0) {
            throw new Error("Aucune donnée valide trouvée !");
        }

        displayRecommendations(allPlaces);
    } catch (error) {
        console.error("🚨 Erreur lors de la récupération des recommandations :", error);
    }
}

// Lancer la récupération des données au chargement de la page
document.addEventListener("DOMContentLoaded", fetchRecommendations);






