const pokemonName = document.querySelector('.pokemon_name')
const pokemonID = document.querySelector('.podekmon_number')
const pokemonImage = document.querySelector('.pokemon_image')

const form = document.querySelector('.form')
const input = document.querySelector('.input_search')
const btnPrev = document.querySelector('.btn-prev')
const btnNext = document.querySelector('.btn-next')


let searchPokemon = 1
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (APIResponse.status === 200) {
        const data = await APIResponse.json()

        return data
    }

}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...'
    pokemonID.innerHTML = ''
    const data = await fetchPokemon(pokemon)
    
    if (data) {
        pokemonImage.style.display = 'block'
        pokemonName.innerHTML = data.name
        pokemonID.innerHTML = data.id
        //se o numero do pokemon for menor ou igual a 649 ele usa o gif fornecido pela API se não ele usa a imagem estatica
        //isso ocorre porque a api não tem gif para todos os pokemons :(
        if (data.id <= 649) {
            pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        }
        else{
            pokemonImage.src = data['sprites']['front_default']
        }
        input.value = ''
        searchPokemon = data.id
    } else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Not found :c'
        pokemonID.innerHTML = ''
    }

}

form.addEventListener('submit', (event) => {
    event.preventDefault()

    renderPokemon(input.value.toLowerCase())

})

btnPrev.addEventListener('click', () => {
    if(searchPokemon > 1){
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

btnNext.addEventListener('click', () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

renderPokemon(searchPokemon)