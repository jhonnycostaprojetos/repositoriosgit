"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { FaGithub, FaPlus, FaBars, FaTrash } from 'react-icons/fa'

interface respositorioProps {
  name: string
}
export default function Home() {
  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState(() => {
    const repoStorage = localStorage.getItem('repos');
    return repoStorage ? JSON.parse(repoStorage) : [];
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  async function getData(url: string) {
    console.log('url:' + `https://api.github.com/repos/${url}`)
    const response = await fetch(`https://api.github.com/repos/${url}`, { next: { revalidate: 120 } }) // o cache é mantido a cada 120segundo, se n passar o cache é pra sempre

    return response.json();
    console.log(response.json())
  }

  useEffect(() => {
    const repoStorage = localStorage.getItem('repos');
    if (repoStorage) {
      setRepositorios(JSON.parse(repoStorage));
    }
  }, []);

  const ob = [{
    name: 'Jhonny',
    idade: 45
  }
  ]
  // useEffect(() => {
  //   localStorage.setItem('repos', JSON.stringify(repositorio));
  // }, [repositorio]);

  useEffect(() => {
    localStorage.setItem('repos', JSON.stringify(repositorios));
  }, [repositorios]);

  function handleInputChange(e) {
    setNewRepo(e.target.value)
  }

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit() {
      setLoading(true);
      setAlert(null);
      try {

        if (newRepo === '') {
          throw new Error('Você precisa indicar um repositorio!');
        }
        const response = await getData(`${newRepo}`)

        const hasRepo = repositorios.find(repo => repo.name === newRepo);

        if (hasRepo) {
          throw new Error('Repositorio Duplicado');
        }

        const data = {
          name: response.full_name,
        }

        setRepositorios([...repositorios, data]);
        setNewRepo('');
      } catch (error) {
        setAlert(true);
        console.log(error);
      } finally {
        setLoading(false);
      }

    }

    submit();

  }, [newRepo, repositorios]);

  //  const handleDelete = useCallback((repo) =>{
  //   const find = repositorio.filter(r => r.name !== repo)
  //   setRepositorio(find);
  //  },[repositorio])

  return (
    <>
      <div className={`bg-white rounded p-8 m-20 `}>
        <h1 className={`flex items-center flex-row text-xl`}>
          <FaGithub size={25} className={`mr-2`} /> Meus Repositorios
        </h1>
        <form className={`mt-7 flex flex-row`} onSubmit={handleSubmit} >
          <input className={`
        flex-1 border-2 ${alert ? 'border-red-500' : 'border-blue-500'} rounded text-base px-3 py-4`} type="text" name="repo" id="repo" placeholder='Adicionar Repositorios'
            value={newRepo}
            onChange={handleInputChange} />
          <p></p>

          <button
            className={`bg-[#0D2636] rounded ml-3 py-0 px-4
        flex justify-center items-center`}
          // setLoading={loading ? 1 : 0}
          >
            <FaPlus color="#fff" size={14} />
          </button>
        </form>
        <ul className={`list-none mt-5`}>
          {repositorios.map(repo => (
            <li className={` flex flex-row items-center justify-between  px-0 py-5 mt-5 border-b border-gray-400`} key={repo.name}>
              <span className={`flex items-center`}>
                <button className={`ml-1 outline-0 rounded-s py-2 px-1`}>
                  <FaTrash size={14} />
                </button>
                {repo.name}</span>
              <Link className={`text-[#0D2636]`} href={`/repositorio/${repo.name}`}>
                <FaBars size={20} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
