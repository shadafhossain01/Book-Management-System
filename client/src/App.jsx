import { Outlet } from "react-router"

function App() {

  return (
    <>
      <div>Header</div>
      <Outlet />
      <div>Footer</div>
    </>
  );
}

export default App
