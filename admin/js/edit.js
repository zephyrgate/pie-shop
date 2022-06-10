let init = () => {
    getPies();
    fillInputs();
    let form = document.querySelector('form.update-form');
    let ingredientsInputs = form.querySelector('.ingredients-inputs');
    form.addEventListener('submit', onSubmitUpdatePie);
    form.querySelector('button.add-ingredient').addEventListener('click', onClickAddIngredientButton);
    form.querySelectorAll('button.remove-ingredient').forEach((button) => button.addEventListener('click', onClickRemoveIngredientButton));
    if (ingredientsInputs.childElementCount === 1) {
        ingredientsInputs.querySelector('button.remove-ingredient').toggleAttribute('disabled', true);
    }
};

let fillInputs = () => {
    let form = document.querySelector('form.update-form');
    let pie = getPieById(parseInt(sessionStorage.getItem('idPieUpdate')));

    form.querySelector('#inputName').value = pie.name;
    form.querySelector('#inputSmallDescription').value = pie.smallDescription;
    form.querySelector('#textareaLongDescription').value = pie.longDescription;
    let ingredientsInputs = form.querySelector('.ingredients-inputs');
    
    let ingredientsDivs = pie.ingredients.map((ingredient) => {
        let ingredientElement = document.createElement('div');
        ingredientElement.className = 'row mb-2 ingredient';
        ingredientElement.innerHTML = `
            <div class="col-md-5 d-flex">
                <span class="d-flex align-items-center me-2">•</span>
                <input type="text" class="form-control ingredient-name" placeholder="Nom" value="${ingredient.name}">
            </div>
            <div class="col-md-3">
                <input type="text" class="form-control ingredient-quantity" placeholder="Quantité" value="${ingredient.qty}">
            </div>
            <div class="col-md-3">
                <input type="text" class="form-control ingredient-risk" placeholder="Risque" value="${ingredient.risk}">
            </div>
            <div class="col-md-1">
                <button type="button" class="btn btn-danger remove-ingredient">&#128465;</button>
            </div>
        `;

        return ingredientElement;
    });
    ingredientsInputs.append(...ingredientsDivs);

    if (ingredientsInputs.childElementCount === 1) {
        ingredientsInputs.querySelector('button.remove-ingredient').toggleAttribute('disabled', true);
    }

    form.querySelector('#inputImage').value = pie.image;
    form.querySelector('#inputPrice').value = pie.price;
}

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
    let childrenCount = ingredientsInputs.childElementCount;
    if (childrenCount === 1) {
        ingredientsInputs.querySelector('button.remove-ingredient').toggleAttribute('disabled', true);
    }
}

let onSubmitUpdatePie = (event) => {
    event.preventDefault();
    let form = event.target;

    let pie = getPieById(Number(sessionStorage.getItem('idPieUpdate')));
    let ingredients = [];
    form.querySelectorAll('div.ingredient').forEach((ingredient) => {
        ingredients.push({
            name: ingredient.querySelector('.ingredient-name').value,
            qty: ingredient.querySelector('.ingredient-quantity').value,
            risk: ingredient.querySelector('.ingredient-risk').value,
        });
    });

    pie.name = form.querySelector('#inputName').value;
    pie.smallDescription = form.querySelector('#inputSmallDescription').value;
    pie.longDescription = form.querySelector('#textareaLongDescription').value;
    pie.ingredients = ingredients;
    pie.image = form.querySelector('#inputImage').value;
    pie.price = parseFloat(form.querySelector('#inputPrice').value);

    updatePie(pie);
    window.location.href = "list.html";
};

window.addEventListener('load', init);