const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");
function searchMeal(e) {
  e.preventDefault();
  single_mealEl.innerHTML = "";
  const term = search.value;
  console.log(term);
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for '${term}'</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<p>This item is not available. Please try some other item !!</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
            <div class="meal">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
            <div class="meal-info" data-mealID="${meal.idMeal}">
            <h3>${meal.strMeal}</h3></div>
            </div>`
            )
            .join("");
        }
      });
    search.value = "";
  } else {
    alert("Please enter a valid Meal Name");
  }
}
submit.addEventListener("submit", searchMeal);

function getMealById(mealID)
{
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
  .then((res) => res.json())
  .then ((data) => {
  const meal=data.meals[0];
  addMealtoDOM(meal)

});
}

function addMealtoDOM(meal)
{
    const ingredient=[];
    console.log(meal);
    for(let i=1;i<=20;i++)
        {
            if(meal[`strIngredient${i}`])
            {
                ingredient.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}` );
            }
        
        else
        {
            break;
        }
    }
    single_mealEl.innerHTML=`
    <div class="single-meal">
        <h1> ${meal.strMeal} </h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
            </div>
            <div class="main">
                <p>${meal.strInstructions}</p>
                <h2>Ingredients</h2>
                <ul>
                ${ingredient.map((ing) =>  `<li>  ${ing} </li>`).join("")}
                </ul>
            </div>
    </div>
    `
}

mealsEl.addEventListener("click", (e) => {
    let mealInfo = e.target;
    while (mealInfo !== null && !mealInfo.classList.contains("meal-info")) {
      mealInfo = mealInfo.parentElement;
    }
  
    if (mealInfo) {
      const mealID = mealInfo.getAttribute("data-mealID");
      console.log(mealID)
        getMealById(mealID);
    }
  });
  
  
  random.addEventListener("click",getrandomMeal)

  function getrandomMeal()
  {
    meals.innerHTML="";
    single_mealEl.innerHTML="";
    resultHeading.innerHTML="";
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        const meal=data.meals[0];
        addMealtoDOM(meal)

    })
  }