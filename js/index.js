(()=>{
    const pokeList = document.querySelector('.pokeList');

    const colorsPerTypes = {
        ['normal']: '#B5B5A6',
        ['water']: '#1f67c5',
        ['electric']: '#fffb01',
        ['grass']: '#19bb6f',
        ['fire']: '#ec4217',
        ['ice']: '#68cff8',
        ['fighting']: '#bd1105',
        ['poison']: '#a30b70',
        ['ground']: '#f8d434',
        ['flying']: '#99A8FF',
        ['psychic']: '#FF6EA8',
        ['bug']: '#B6C542',
        ['rock']: '#C4B67C',
        ['ghost']: '#36002f',
        ['dragon']: '#8B7CF0',
        ['dark']: '#2E3436',
        ['steel']: '#B6B6C5',
        ['fairy']: '#F0A8F0'
    }

    Promise.all(getPokemons()).then( pokemons => {
        pokemons.forEach( pokemon => {
            buildCardComponent(
                createCard(pokemon.types, pokemon.name), 
                createSprite(pokemon.id), 
                createName(pokemon.name),
                createTypes(pokemon.types)
            )
        });
        unableSiteFunctionaties();
    });

    function unableSiteFunctionaties() {
        const cards = [
            ...document.querySelectorAll('a[data-id="animation"]')
        ];
        unableSearch(cards);
        unableEffects(cards);
    }

    function unableSearch(cards) {
        const input = document.querySelector('input[data-input="search"]');
        input.addEventListener('keydown', e => {
            setTimeout(()=> {
                const inputData = e.target.value;
                const regex = new RegExp( inputData , 'i');
    
                cards.forEach(card => {
                    card.classList.add('hidden');
                });       
                cards
                .filter(card => {
                    const name = card.getAttribute('data-name');
        
                    return name.search(regex) !== -1; 
                })
                .forEach(card => {
                    card.classList.remove('hidden');
                });

                simulateScroll();
            }, 200);
        })
    }

    function simulateScroll() {
        // The code below is needed to trigger the scrollEvent with no user action being necessary; 
        window.scrollTo(scrollX, scrollY +1)
        window.scrollTo(scrollX, scrollY -1)
    }

    function unableEffects(cards) { 
        // Card's Effect 
        const windowHeight = window.innerHeight;

        function isOnScreen(e) {
            const windowTop = e.pageY;
            const windowBottom = windowTop + windowHeight;  
                        
            return cards.forEach(card => {            
                const elementHeight = card.clientHeight;
                const elementTop = card.offsetTop;
                const elementBottom = elementTop + elementHeight;

                return elementTop < windowBottom && elementBottom > windowTop
                    ? card.classList.add('animationCard')
                    : card.classList.remove('animationCard');
            })
        }
        simulateScroll();

        document.addEventListener('scroll', e => {
            isOnScreen(e)
        })
    }

    function requestPokemon(id) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(data => data)
        .then(response => response.json())
    } 
    
    function getPokemons() {
        const pokemons = [];
        for(let i = 1; i < 151; i++) {
            pokemons.push(requestPokemon(i));
        }
        return pokemons;
    }
    
    function getCssTypeColor(type) {
        return colorsPerTypes[type]
    }

    function createCard(types, name) {
        const mainType = types[0].type.name;
        const mainColor = getCssTypeColor(mainType);
        const card = document.createElement('a');
            card.setAttribute('class', 'pokeCard');
            card.setAttribute('data-id', 'animation');
            card.setAttribute('data-name', name);
            card.style.boxShadow = `
            -20px 0px ${mainColor},
            -20px 3px ${mainColor}
            `;
            card.style.color = `${mainColor}`

        return card;
    }

    function createTypes(pokemonTypes) {
        const types = []
        pokemonTypes.forEach( ({ type }) => {
            const p = document.createElement('p');
            p.setAttribute('class', `type`);
            p.innerText = type.name;
            p.style.backgroundColor = getCssTypeColor(type.name);
            types.push(p);
        })

        return types;
    } 
    
    function createSprite(id) {
        const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`; 
        const sprite = document.createElement('img');
            sprite.setAttribute('class', 'sprite');
            sprite.setAttribute(
                'src',
                url
            );
        return sprite;
    }
        
    function createName(name) {
        const h2 = document.createElement('h2');
            h2.innerText = name;
            h2.setAttribute('class', 'name');
        return h2;
    }
        
    function buildCardComponent(card, sprite, name, types) {
        card.appendChild(sprite);
        card.appendChild(name);
        types.forEach( type => card.appendChild(type));
        pokeList.appendChild(card);
    }
     
})();

// function promiseResolve() {

//     return Promise.resolve("resolvida com sucesso");
// }

// promiseResolve().then(message =>{
//     setTimeout(()=> {
//         console.log(`Promisse ${message}`)
//     }, 2000)
// })


// function promiseReject() {
//     return Promise.reject("ferrou geral");
// }

// promiseReject().catch(message => {
//     setTimeout(()=> {
//         console.log(`Só tenho a dizer que ${message}`)
//     }, 4000)
// })

// function promiseMaster() {
//     return new Promise((resolve, reject)=> {
//         setTimeout(()=> {
//             resolve('Funfou');
//         }, 2000);
//     })
// }

// promiseMaster().then(text => {
//     console.log(`${text} usando return`)
// })