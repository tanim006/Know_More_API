async function mainFunction() {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts`);
    const data = await res.json();
    console.log(data);
    const allData = data.posts;
    displayData(allData);
}

function displayData(posts) {
    const ALL_post_container = document.getElementById('All-post-container');
    ALL_post_container.innerHTML = ''; // Clear previous results if any
    posts.forEach(function (allPost) {
        console.log(allPost);

        // Determine the dot color based on the isActive property
        const dotColor = allPost.isActive ? 'bg-green-500' : 'bg-red-500';

        const div = document.createElement('div');
        div.classList = `hero w-[772px] h-auto bg-[#797DFC1A] border border-[#797DFC] p-5 relative rounded-xl mt-[100px]`;
        div.innerHTML = `
            <div class="hero-content flex-col relative">
                <div class="relative">
                    <img src="${allPost.image}" class="rounded-lg shadow-2xl w-20 h-20 mx-auto mb-5" />
                    <span class="absolute top-0 right-0 w-4 h-4 ${dotColor} rounded-full border-2 border-white"></span>
                </div>
                <div>
                    <div class="flex gap-x-5 justify-center">
                        <p>#${allPost.category}</p>
                        <p>Author : <span>${allPost.author.name}</span></p>
                    </div>
                    <h1 class="text-xl w-[438px] h-[25px] font-bold text-center mx-auto">
                        ${allPost.title}
                    </h1>
                    <p class="py-6 text-center">${allPost.description}</p>
                    <hr class="mb-5 border-dotted">
                    <div class="flex justify-between items-center">
                        <div>
                            <i class="fa-regular fa-message"> 560</i>
                            <i class="fa-regular fa-eye ml-10"> 1564 </i>
                            <i class="fa-regular fa-clock ml-10"> 5 min</i>
                        </div>
                        <div>
                            <i onclick="clicked(this)" class="fa-solid fa-envelope-open-text btn btn-ghost p-3 envelop_thing rounded-full"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
        ALL_post_container.appendChild(div);
    });
    // delay THE SPINNER TIME
    setTimeout(function (){
    spinner(false)

    },1000)
}

function clicked(buttonElement) {
    // Get the parent of the clicked button
    const parentDiv = buttonElement.closest('.hero-content');
    
    // Get the h1 content
    const h1Content = parentDiv.querySelector('h1').textContent;
    
    const newDiv = document.createElement('div');
    newDiv.classList = `w-[356px] h-[82px] shadow-lg rounded-lg border mt-10 flex items-center p-4 justify-between`;
    newDiv.innerHTML = `
        <h1 class="w-[212px] font-semibold">${h1Content}</h1>
        <p><i class="fa-regular fa-eye">1568</i></p>     
    `;
    
    document.getElementById('second_container').appendChild(newDiv);
    
    // Select the span element and increment the number
    const spanElement = document.querySelector('#count');
    const currentNumber = parseInt(spanElement.textContent.replace(/[()]/g, ''));
    spanElement.textContent = `(${currentNumber + 1})`;
}

async function searchFunction(category) {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`);
    const data = await res.json();
    console.log(data);
    const allData = data.posts;
    displayData(allData); // Update the UI with the filtered results
}

function searchItem() {
    spinner(true)
    const search = document.getElementById('search');
    const searchInnerText = search.value;
    searchFunction(searchInnerText); // Fetch and display search results
}

function spinner (isLoading){
    const spinner = document.getElementById('spinner')
    if(isLoading){
        spinner.classList.remove('hidden')
    }
    else{
        spinner.classList.add('hidden')
    }
}

mainFunction();

// latest part fetch 
async function latest (){
    const res = await fetch (`https://openapi.programming-hero.com/api/retro-forum/latest-posts`)
    const latestData = await res.json()
    console.log(latestData)
    displayLatest(latestData)
}






function displayLatest (lData){
    const latestDataContainer = document.getElementById('latest_data_container')
    lData.forEach(function (lPData){
        console.log(lPData)
        const div = document.createElement('div')
        div.classList = `card w-[374px] h-[482px] shadow-xl`
        div.innerHTML = `
        <figure class="px-10 pt-10">
        <img
          src="${lPData.cover_image}"
          alt="Shoes"
          class="rounded-xl" />
      </figure>
      
      <div class="card-body ">
          <div class="flex items-center">
              <i class="fa-regular fa-calendar"></i>
              <p class="ml-5">${lPData?.author?.posted_date || 'No PUblish Date'}</p>
          </div>
        <h2 class="card-title text-lg">${lPData.title}</h2>
        <p>${lPData.description}</p>
        <div class="flex">
          <img src="${lPData.profile_image}" alt="" class="w-[44px] h-[44px] rounded-full">
          <di class="ml-5">
              <h1 class="font-semibold">${lPData.author.name}</h1>
              <p>${lPData?.author?.designation || 'Unknown'}</p>

          </div>
        </div>
        
      </div>
        `
        latestDataContainer.appendChild(div)
    })

    
    
}

latest()
