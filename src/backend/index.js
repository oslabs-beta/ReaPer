import { startReaperSession, endReaperSession } from './rdtFiber';

startReaperSession();

document.addEventListener('endReaperSession', (event) => {
  console.log('endReaperSession event triggered!');
  endReaperSession();
});
