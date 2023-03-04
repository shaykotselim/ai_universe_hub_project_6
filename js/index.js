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
