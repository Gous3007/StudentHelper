const fetchBackendResources = async () => {
  try {
    const response = await fetch('/api/backend-resources');
    const data = await response.json();
    updateResourcesPage(data.Backend);
  } catch (error) {
    console.error('Error fetching backend resources:', error);
  }
};

const updateResourcesPage = ({ title, resources: { images, description, maintitle, videos, pdfs } }) => {
  document.getElementById('html-image').src = images[0].url;
  document.querySelector('h2').textContent = title;
  document.getElementById('html-paragrapgh').textContent = description;

  document.getElementById('main-title').textContent = maintitle;
  document.getElementById('html-video').src = videos[0].url;
  document.getElementById('video-title').textContent = videos[0].title;
  document.getElementById('video-discription').textContent = description;

  document.getElementById('pdf-title').textContent = pdfs[0].title;
  document.getElementById('pdf-discription').textContent = pdfs[0].description;
  document.getElementById('pdf-link').href = pdfs[0].url;

  document.getElementById('pdf-title-2').textContent = pdfs[1].title;
  document.getElementById('pdf-discription-2').textContent = pdfs[1].description;
  document.getElementById('pdf-link-2').href = pdfs[1].url;
};

if (window.location.search.includes('source=backend')) {
  fetchBackendResources();
}
