
import './App.css';
import { Outlet } from 'react-router-dom';
import  { Toaster } from 'react-hot-toast';

function App() {
  return (
   <>
   <Toaster/>
   <main className=''>
      <Outlet/>

   </main>
   </>
  );
}

export default App;
