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
// <--------------Load  Details Area---------->
const loadDetails = async id => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data)
  displayAIDetail(data.data, data.data.features);
}
// <---------------Show Details into the Modal------------->
const displayAIDetail = (detail, features) => {
  console.log(detail, features)
  const { feature_name } = features
  const modalBody = document.getElementById('modalBody');
  modalBody.innerHTML = `
  <div class=" min-width ">
  
      <div class=" gap-5  d-flex">
          <div class="col bg-danger-subtle d-flex ">
              <div class="border border-danger-subtle rounded p-3 sm:p-1 ">
              <h3>${detail.description}</h3>
              <div class="d-flex  gap-4 mt-5 text-center">
              <div class="card-body container ">
                  <div class=" border border-danger-subtle rounded fw-bold py-3 sm:py-1 text-success border-0 bg-light opacity-75 h-100">
                  <p>${detail.pricing ? detail.pricing[0].price : 'Not Available'}</p>
                  <p>${detail.pricing ? detail.pricing[0].plan : ''}</p>
                  </div>
              </div>
              <div class="card-body container sm:p-5">
                  <div style="color:#F28927" class="border border-danger-subtle rounded fw-bold py-3 border-0 bg-light opacity-75 h-100 ">
                  <p>${detail.pricing ? detail.pricing[1].price : 'Not Available'}</p>
                  <p>${detail.pricing ? detail.pricing[1].plan : ''}</p>
                  </div>
              </div>
              <div class="card-body container h-100 sm:p-5">
                  <div class="border border-danger-subtle rounded fw-bold py-3 text-danger border-0 bg-light opacity-75">
                  <p>${detail.pricing ? detail.pricing[2].price : 'Not Available'}</p>
                  <p>${detail.pricing ? detail.pricing[2].plan : ''}</p>
                  </div>
              </div>
              </div>
          <div class="d-flex justify-content-between mx-5 mt-3">
                  <div>
                      <h4>Features</h4>
                      <ul>
                      ${detail.features['1']? `<li>${detail.features['1'].feature_name}</li>` : ' '}
                      ${detail.features['2']? `<li>${detail.features['2'].feature_name}</li>` : ' '}
                      ${detail.features['3']? `<li>${detail.features['3'].feature_name}</li>` : ' '}
                      ${detail.features['4']? `<li>${detail.features['4'].feature_name}</li>` : ' '}
                      
                      </ul>  
                  </div>
                  
                  <div>
                      <h4>Integrations</h4>
                      <ul>
                     
                      <ul id="idIntegration">
                      
                      </ul>
                  </div>
          </div>
      </div>
      </div>
      <div class="col">
          <div class="border border-danger-subtle p-3 rounded h-100 ">
              <div class="card-imf-overlay">
                  <img class="img-fluid rounded"  src="${detail.image_link[0] ? detail.image_link[0] : detail.image_link[1]}"alt="">
                  <p id="accuracy" class=" d-none m-5  bg-danger rounded text-light badge p-2 position-absolute top-0 end-0 ">${detail.accuracy.score * 100}% Accuracy</p>
              </div>
              <div class="card-body text-center mt-4">
                  <h5 class="card-title">${detail.input_output_examples ? detail.input_output_examples[0].input : "No! Not Yet! Take a break!!!"}</h5>
                  <p class="card-text">${detail.input_output_examples ? detail.input_output_examples[0].output : ""}</p>
              </div>
          </div>
      </div>
      
  <div>
  `;
  const integrationsList = document.getElementById('idIntegration')
    detail.integrations.forEach(integration => {
        console.log(integration);
        const li = document.createElement('li');
            li.innerText = `${integration? integration:"Not Found Data"}`;
            integrationsList.appendChild(li);
    })
  // <-------------Validation for null Accuracy ------------>

  const accuracy = document.getElementById('accuracy');
  if (detail.accuracy.score === null) {
      accuracy.classList.add('d-none')
  }
  else {
      accuracy.classList.remove('d-none')
  }
}