import { Link } from "react-router-dom";

function HomePage() {
  return (
  <section className="bg-red-500 flex justify-center items-center">
    <header className="bg-zinc-800 p-10">
      <h1 className="text-5xl py-2 font-bold">ASHA</h1>
      <p className="text-md text-slate-400">
        Crea tus tareas
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque, iusto ducimus possimus ad ex atque? Nesciunt tenetur, voluptate maiores, odio nemo autem asperiores adipisci accusamus dicta vero, corrupti voluptatibus similique.
      </p>
      <Link
        className="bg-zinc-400 text-white hover:bg-green-400 px-4 py-2 rounded-md mt-4 inline-block"
        to="/login"
      >
        Comenzar
      </Link>
    </header>
  </section>
  );
}

export default HomePage;
