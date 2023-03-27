console.log('Hey I am from devtools');

function handleShown() {
  console.log('panel is being shown');
}

function handleHidden() {
  console.log('panel is being hidden');
}

chrome.devtools.panels.create('Test Panel', '', '/devtools/panel/panel.html', (panel) => {
  panel.onShown.addListener(handleShown);
  panel.onHidden.addListener(handleHidden);  
});