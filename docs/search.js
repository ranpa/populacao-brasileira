const endpoint = 'data/cidades.min.json';
const cities = [];

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data))
  .catch(error => console.error(error));

function numberWithDot(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi');
    return place.cidade.match(regex) || place.estado.match(regex);
  });
}

function displayMatches() {
  if (this.value.length < 3) {
    suggestions.innerHTML = `
      <li>Filtre por cidade</li>
      <li>ou por estado</li>
    `;
    return;
  }
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.cidade.replace(regex, `<span class="hl">${this.value.toUpperCase()}</span>`);
    const stateName = place.estado.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithDot(place.populacao)}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
