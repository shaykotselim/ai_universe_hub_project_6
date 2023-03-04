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