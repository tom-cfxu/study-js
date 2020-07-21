const search = document.getElementById('search'),
    submit = document.getElementById('submit'),
    random = document.getElementById('random'),
    mealsEl = document.getElementById('meals'),
    resultHeading = document.getElementById('result-heading'),
    single_mealEl = document.getElementById('single-meal');


//searchMeal函数通过fetch请求API获取数据
function searchMeal(e) {
    e.preventDefault();
    //清空single_meal
    single_mealEl.innerHTML = "";

    //获取search 输入框的值
    const term = search.value;
    // console.log(term)
    //检查输入值是否为空
    if (term.trim()) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                resultHeading.innerHTML = `<h2>${term}的查询结果为: </h2>`
                if (data.meals === null) {
                    resultHeading.innerHTML = `<p>没有查询到相关食谱,请重新输入! </p>`
                } else {
                    mealsEl.innerHTML = data.meals.map(meal =>
                        `
                        <div class="meal">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                            <div class="meal-info" data-mealId="${meal.idMeal}" >
                            <h3>${meal.strMeal}</h3>
                        </div>
                        </div>
                        
                        `
                    ).join("");
                }
            });
        //清空搜索框
        search.value = "";
    } else {
        alert("请输入搜索内容!")
    }
}
//addMealToDOM函数
function addMealToDOM(meal) {
    console.log(meal)
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`]) {
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}  `
            )
        } else {
            break;
        }
    }
    // console.log(ingredients)
    single_mealEl.innerHTML =
        `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <div class="single-meal-info">
            ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
            ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
        </div>
        <div class="main">
            <p>${meal.strInstructions}</p>
            <h2>Ingredients</h2>
            <ul>
                ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
            </ul>
        </div>
    </div>
    `
}
// getMealById函数
function getMealById(mealID) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            const meal = data.meals[0];
            addMealToDOM(meal);
        }
        )
}
//事件监听
submit.addEventListener("click", searchMeal)
mealsEl.addEventListener('click', e => {
    const mealInfo = e.path.find(item => {
        // console.log(item)
        if (item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false
        }
    });
    if (mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealId')
        // console.log(mealID)
        getMealById(mealID)
    }
})