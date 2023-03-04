// <-------allData Fetching-------->

const loadAllData = async () => {
  toggleSpinner(true)
  const url = `https://openapi.programming-hero.com/api/ai/tools`
  try {
      const res = await fetch(url);
      const data = await res.json();
      displayTools(data.data.tools.slice(0, 6))
      toggleSpinner(false)
  }
  catch (error) {
      console.log(error);
  }
}

// <--------------Spinner----------->
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('spinner-container');
  if (isLoading) {
      loaderSection.classList.remove('d-none')
  }
  else {
      loaderSection.classList.add('d-none')
  }
}

// <----------Full Data Load by Slicing for first page------------->
const allToolsDataLoad = async () => {
  toggleSpinner(true)
  const url = `https://openapi.programming-hero.com/api/ai/tools`
  try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.data.tools.length > 6) {
          displayTools(data.data.tools.slice(6, 12))
          const seeMoreButton = document.getElementById('showMore')
          seeMoreButton.classList.add('d-none');
          toggleSpinner(false)
      }
  }
  catch (error) {
      console.log(error);
  }
}
// <------------single Data ----------->

const displayTools = (tools) => {
  const toolsContainer = document.getElementById('tools-container');
  tools.forEach(singleTool => {
      console.log(singleTool);
      const divTool = document.createElement('div');
      divTool.classList.add("col");

      divTool.innerHTML = `
                      <div class="card p-5 h-100">
                          <img src="${singleTool.image}" class="card-img-top" alt="...">
                          <div class="card-body mb-5">
                              <h5 class="card-title fw-bold">Features</h5>
                              <ol id="li-container" class =" card-text">
                              ${singleTool.features[0] ? `<li>${singleTool.features[0]}</li>`: '' }
                              ${singleTool.features[1] ? `<li>${singleTool.features[1]}</li>`: '' }
                              ${singleTool.features[2] ? `<li>${singleTool.features[2]}</li>`: '' }
                              ${singleTool.features[3] ? `<li>${singleTool.features[3]}</li>`: '' }
                              </ol>
                          </div>
                          <div class="card-footer d-flex justify-content-between align-items-center">
                              <div>
                              <h5 class ="mt-2">${singleTool.name}</h5>
                              <p class="mt-3"> <i class="fa-solid fa-calendar-days"></i> ${singleTool.published_in}</p>
                              </div>
                              <div>
                              <span onclick="loadDetails('${singleTool.id}')" href="#" class="border border-0" data-bs-toggle="modal" data-bs-target="#AIDetailsModal">  <i class="fa-solid fa-arrow-right text-danger  w-100  p-2 opacity-50 bg-danger-subtle rounded-circle"></i> </span>
                              </div> 
                          </div>
                      </div>
      
      `
      toolsContainer.appendChild(divTool)
  })
      
}
