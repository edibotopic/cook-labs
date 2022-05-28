document.addEventListener('DOMContentLoaded', () => {
  ;(show = async () => {
    let parseList = await (await fetch('recipes/recipes.json')).text()
    let name = JSON.parse(parseList)[standIn]['name']
    let recipeString = await (await fetch(`recipes/` + name)).text()
    const recipe = new Recipe(recipeString)
    // cooklang
    document.getElementById('placeholder').textContent = recipeString
    // json
    document.getElementById('formatted').innerText = JSON.stringify(
      recipe,
      undefined,
      2
    )
    hljs.addPlugin(new CopyButtonPlugin())
    hljs.highlightAll()

    const template = `
        <h3>${recipe.metadata[0].value} ( <i>by ${recipe.metadata[1].value}</i> )</h3>
    `

    document.getElementById('pretty').innerHTML = template

    let listIngredients = () => {
      let length = Object.keys(recipe.ingredients).length
      let parent = document.getElementById('IngList')
      parent.innerHTML =
        '<i class="fa-solid fa-cubes-stacked fa-lg icon-ingredient" aria-hidden="true"></i>'

      for (let i = 0; i < length; i++) {
        const newIng = document.createElement('p')
        parent.appendChild(newIng)

        newIng.innerHTML =
          '<strong class="card-list-item-med">' +
          recipe.ingredients[i].name +
          '</strong>' +
          ' ' +
          '<span class="accent-red">(</span>' +
          '<i class="quants">' +
          recipe.ingredients[i].quantity +
          ' ' +
          recipe.ingredients[i].units +
          '</i>' +
          '<span class="accent-red">)</span>'
        newIng.setAttribute('id', [i])
      }
    }

    let listEquipment = () => {
      let length = Object.keys(recipe.cookware).length
      let parent = document.getElementById('EqpList')
      parent.innerHTML =
        '<strong class="card-list-item-wide"><i class="fa-solid fa-kitchen-set fa-lg icon-equipment" style="padding-right: 4vw;" aria-hidden="true"></i></strong>'

      for (let i = 0; i < length; i++) {
        const newEqp = document.createElement('span')
        parent.appendChild(newEqp)
        newEqp.innerHTML =
          '<strong class="card-list-item-wide">' +
          '<span class="accent-white">|</span>' +
          recipe.cookware[i].name
        '</strong>' + newEqp.setAttribute('id', [i])
      }
    }

    let showImage = async () => {
      const Image = document.getElementById('MealImage')
      // Image.innerHTML ='<i class="fas fa-camera" aria-hidden="true"></i>'
      ;(await fetch(
        'recipes/' + recipe.metadata[0].value.split(' ').join('') + '.jpeg'
      )
        .then((res) => {
          if (res.ok) {
            Image.setAttribute(
              'src',
              'recipes/' +
                recipe.metadata[0].value.split(' ').join('') +
                '.jpeg'
            )
          } else if (res.status === 404) {
            Image.setAttribute(
              'src',
              'recipes/' + recipe.metadata[0].value.split(' ').join('') + '.png'
            )
          }
        })
        .catch((err) => console.log('Error: ', err))) && console.log('baluga')
    }

    let formatter = (sourceString) => {
      const symbols_to_remove = /[`@#]/gi
      const symbols_to_space = /[`%]/gi
      const symbols_to_for = /[~]/gi
      const bracket_to_replace = /[\}]/gi
      const bracket_to_replace_and_space = /[\{]/gi
      const brackets_empty = /\(\)/g

      var outString = sourceString
        .replace(symbols_to_remove, '')
        .replace(symbols_to_space, ' ')
        .replace(symbols_to_for, 'for')
        .replace(bracket_to_replace, ')')
        .replace(bracket_to_replace_and_space, ' (')
        .replace(brackets_empty, '')

      return outString
    }

    let listSteps = () => {
      let length = Object.keys(recipe.steps).length

      let parent = document.getElementById('StepList')
      parent.innerHTML =
        '<i class="fa-solid fa-diagram-project fa-lg icon-steps" aria-hidden="true"></i>'

      for (let i = 0; i < length; i++) {
        const newStep = document.createElement('p')
        parent.appendChild(newStep)
        newStep.innerHTML =
          '<strong class="accent-red">' +
          [i + 1] +
          '. ' +
          '</strong>' +
          formatter(recipe.steps[i].raw)
        newStep.setAttribute('id', [i])
      }
    }

    listSteps()
    listIngredients()
    listEquipment()
    showImage()
  })()
})
