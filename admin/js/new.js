let onSubmitNewPie = async (event) => {
    event.preventDefault();
    let form = event.target;

    await getPies();
    let ingredients = [];
    form.querySelectorAll('div.ingredient').forEach((ingredient) => {
        ingredients.push({
            name: ingredient.querySelector('.ingredient-name').value,
            qty: ingredient.querySelector('.ingredient-quantity').value,
            risk: ingredient.querySelector('.ingredient-risk').value,
        });
    });

    await addPie(new Pie(
        form.querySelector('#inputName').value,
        form.querySelector('#inputSmallDescription').value,
        form.querySelector('#textareaLongDescription').value,
        ingredients,
        form.querySelector('#inputImage').value,
        parseFloat(form.querySelector('#inputPrice').value),
    ));
    window.location.href = "list.html";
};

let onClickAddIngredientButton = () => {
    let ingredientsInputs = document.querySelector('.ingredients-inputs');
    let newIngredientElement = document.createElement('div');
    newIngredientElement.className = 'row mb-2 ingredient';
    newIngredientElement.innerHTML = `
        <div class="col-md-5 d-flex">
            <span class="d-flex align-items-center me-2">•</span>
            <input type="text" class="form-control ingredient-name" placeholder="Nom">
        </div>
        <div class="col-md-3">
            <input type="text" class="form-control ingredient-quantity" placeholder="Quantité">
        </div>
        <div class="col-md-3">
            <input type="text" class="form-control ingredient-risk" placeholder="Risque">
        </div>
        <div class="col-md-1">
            <button type="button" class="btn btn-danger remove-ingredient">&#128465;</button>
        </div>
    `;
    ingredientsInputs.appendChild(newIngredientElement);

    let disabledButton = ingredientsInputs.querySelector('button.remove-ingredient[disabled]');
    if (disabledButton) {
        disabledButton.toggleAttribute('disabled', false);
    }

    ingredientsInputs
        .querySelector('.ingredient:last-child button.remove-ingredient')
        .addEventListener('click', onClickRemoveIngredientButton)
    ;
};

let onClickRemoveIngredientButton = (event) => {
    let ingredientsInputs = document.querySelector('.ingredients-inputs');
    let ingredientsDivs = ingredientsInputs.querySelectorAll('.ingredient');
    ingredientsDivs.forEach((ingredientDiv) => {
        if (ingredientDiv.querySelector('button.remove-ingredient') == event.target) {
            ingredientsInputs.removeChild(ingredientDiv);
        }
    });
    if (ingredientsInputs.childElementCount === 1) {
        ingredientsInputs.querySelector('button.remove-ingredient').toggleAttribute('disabled', true);
    }
}

let init = () => {
    let form = document.querySelector('form.create-form');
    form.addEventListener('submit', onSubmitNewPie);
    form.querySelector('button.add-ingredient').addEventListener('click', onClickAddIngredientButton);
    document
        .querySelector('.ingredients-inputs')
        .querySelector('button.remove-ingredient')
        .addEventListener('click', onClickRemoveIngredientButton)
    ;
};

window.addEventListener('load', init);