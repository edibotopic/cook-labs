'use strict'

// Populate list with recipes
document.addEventListener('DOMContentLoaded', () => {
  ;(async () => {
    let fullList = await (await fetch('./recipes/recipes.json')).text()

    let forlength = JSON.parse(fullList)
    let length = Object.keys(forlength).length
    const list = document.createElement('section')
    list.setAttribute('class', 'basic-grid')

    let SpaceCamel = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g

    for (let i = 0; i < length; i++) {
      const newItem = document.createElement('div')
      list.appendChild(newItem)

      newItem.innerText = JSON.parse(fullList)
        [i]['name'].split('.')
        .shift()
        .replace(SpaceCamel, '$1$4 $2$3$5')
      const recipeList = document.getElementById('recipe-list')
      document.body.insertBefore(list, recipeList)
      newItem.setAttribute('id', [i])
      newItem.setAttribute('class', 'card')
      newItem.setAttribute('onclick', 'return_click(this.id);show()')
    }
  })()
})
//TODO: use this for names?
// recipe.metadata[0].value}
