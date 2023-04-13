import { startReaperSession, endReaperSession } from './rdtFiber';

startReaperSession();

document.addEventListener('startReaperSession', (event) => {
  // console.log('startReaperSession event triggered!');
  startReaperSession();
});

document.addEventListener('endReaperSession', (event) => {
  // console.log('endReaperSession event triggered!');
  endReaperSession();
});
