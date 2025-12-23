import Header from "./_components/Header";

function layout({ children }) {
  return (
    <div className="light">
      <Header />
      {children}
    </div>
  );
}

export default layout;
